import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { getCheckoutStatus } from '../services/api';

const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const [status, setStatus] = useState('loading');
  const [paymentData, setPaymentData] = useState(null);
  const [pollCount, setPollCount] = useState(0);

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    const pollPaymentStatus = async () => {
      try {
        const data = await getCheckoutStatus(sessionId);
        setPaymentData(data);
        
        if (data.payment_status === 'paid') {
          setStatus('success');
        } else if (data.status === 'expired' || pollCount >= 5) {
          setStatus('error');
        } else {
          setPollCount(prev => prev + 1);
          setTimeout(pollPaymentStatus, 2000);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        if (pollCount >= 5) {
          setStatus('error');
        } else {
          setPollCount(prev => prev + 1);
          setTimeout(pollPaymentStatus, 2000);
        }
      }
    };

    pollPaymentStatus();
  }, [sessionId, pollCount]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <main className="pt-20 min-h-screen bg-[#FDFDFB] flex items-center justify-center" data-testid="checkout-success-page">
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="h-16 w-16 text-[#0F3057] animate-spin mx-auto mb-6" />
            <h1 className="font-heading text-3xl font-medium text-[#0F3057] mb-2">Processing Payment</h1>
            <p className="font-body text-[#5C636A]">Please wait while we confirm your payment...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="h-20 w-20 text-[#2D5A43] mx-auto mb-6" />
            <h1 className="font-heading text-3xl font-medium text-[#0F3057] mb-2">Payment Successful!</h1>
            <p className="font-body text-[#5C636A] mb-6">
              Thank you for your purchase. You will receive a confirmation email shortly.
            </p>
            
            {paymentData && (
              <div className="bg-[#F5F5F0] p-6 rounded-sm mb-8">
                <div className="flex justify-between font-body text-sm mb-2">
                  <span className="text-[#5C636A]">Amount Paid</span>
                  <span className="font-semibold text-[#0F3057]">{formatPrice(paymentData.amount_total)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-[#5C636A]">Status</span>
                  <span className="font-semibold text-[#2D5A43] capitalize">{paymentData.payment_status}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Link to="/orders">
                <Button className="btn-primary w-full rounded-sm" data-testid="view-orders">
                  View My Orders
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="outline" className="w-full rounded-sm" data-testid="continue-shopping">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="h-20 w-20 text-[#9E2A2B] mx-auto mb-6" />
            <h1 className="font-heading text-3xl font-medium text-[#0F3057] mb-2">Payment Issue</h1>
            <p className="font-body text-[#5C636A] mb-6">
              There was an issue processing your payment. Please try again or contact support if the problem persists.
            </p>
            
            <div className="flex flex-col gap-3">
              <Link to="/cart">
                <Button className="btn-primary w-full rounded-sm" data-testid="return-to-cart">
                  Return to Cart
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="outline" className="w-full rounded-sm">
                  Continue Browsing
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default CheckoutSuccessPage;
