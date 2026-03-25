import React, { useState, useEffect } from 'react';
import { 
  Mail, Users, ShoppingCart, Gift, TrendingUp, 
  Play, RefreshCw, Clock, CheckCircle, AlertCircle,
  Send, Calendar, Award, Star
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const StatCard = ({ icon: Icon, label, value, color = "blue", subLabel }) => {
  const colorClasses = {
    blue: "bg-[#0F3057]/10 text-[#0F3057]",
    green: "bg-[#2D5A43]/10 text-[#2D5A43]",
    orange: "bg-[#B64E33]/10 text-[#B64E33]",
    gold: "bg-[#E5A93C]/10 text-[#E5A93C]",
    purple: "bg-purple-100 text-purple-600"
  };

  return (
    <div className="bg-white border border-[#E5E5DF] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-[#5C636A] mb-1">{label}</p>
          <p className="font-heading text-3xl font-medium text-[#0F3057]">{value}</p>
          {subLabel && <p className="text-sm text-[#5C636A] mt-1">{subLabel}</p>}
        </div>
        <div className={`p-3 ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

const AdminAutomationPanel = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [runningAction, setRunningAction] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/automation/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch automation stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const runCartAbandonmentCheck = async () => {
    setRunningAction('cart');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/automation/check-abandoned-carts`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hours_threshold: 24 })
      });
      
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        fetchStats();
      } else {
        toast.error('Failed to run cart abandonment check');
      }
    } catch (error) {
      toast.error('Error running cart abandonment check');
    } finally {
      setRunningAction(null);
    }
  };

  const runWelcomeSeries = async () => {
    setRunningAction('welcome');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/automation/send-welcome-series`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        toast.success(`Welcome series: ${data.day2_emails_sent} Day 2, ${data.day5_emails_sent} Day 5 emails sent`);
        fetchStats();
      } else {
        toast.error('Failed to run welcome series');
      }
    } catch (error) {
      toast.error('Error running welcome series');
    } finally {
      setRunningAction(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <RefreshCw className="h-8 w-8 animate-spin text-[#5C636A] mx-auto" />
        <p className="mt-4 text-[#5C636A]">Loading automation stats...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="admin-automation-panel">
      {/* Email Automation Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading text-2xl text-[#0F3057]">Email Automation</h2>
            <p className="text-[#5C636A]">Manage automated email campaigns and sequences</p>
          </div>
          <Button 
            onClick={fetchStats} 
            variant="outline" 
            size="sm"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Email Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={Mail} 
            label="Welcome Day 2" 
            value={stats?.email_stats_30d?.welcome_series_day2 || 0}
            color="blue"
            subLabel="Last 30 days"
          />
          <StatCard 
            icon={Calendar} 
            label="Welcome Day 5" 
            value={stats?.email_stats_30d?.welcome_series_day5 || 0}
            color="green"
            subLabel="Last 30 days"
          />
          <StatCard 
            icon={ShoppingCart} 
            label="Cart Abandonment" 
            value={stats?.email_stats_30d?.cart_abandonment || 0}
            color="orange"
            subLabel="Last 30 days"
          />
          <StatCard 
            icon={AlertCircle} 
            label="Pending Carts" 
            value={stats?.abandoned_carts_pending || 0}
            color="gold"
            subLabel="24+ hours old"
          />
        </div>

        {/* Action Buttons */}
        <div className="bg-[#F5F5F0] p-6 border border-[#E5E5DF]">
          <h3 className="font-medium text-[#0F3057] mb-4">Run Automation Tasks</h3>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={runCartAbandonmentCheck}
              disabled={runningAction === 'cart'}
              className="bg-[#B64E33] hover:bg-[#9D4330] text-white gap-2"
              data-testid="run-cart-abandonment"
            >
              {runningAction === 'cart' ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <ShoppingCart className="h-4 w-4" />
              )}
              Send Cart Abandonment Emails
            </Button>
            <Button
              onClick={runWelcomeSeries}
              disabled={runningAction === 'welcome'}
              className="bg-[#0F3057] hover:bg-[#1A4A7A] text-white gap-2"
              data-testid="run-welcome-series"
            >
              {runningAction === 'welcome' ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Send Welcome Series
            </Button>
          </div>
          <p className="text-sm text-[#5C636A] mt-4">
            <Clock className="h-4 w-4 inline mr-1" />
            Tip: Schedule these tasks daily using a cron job or external scheduler for best results.
          </p>
        </div>
      </div>

      {/* Referral Program Section */}
      <div>
        <div className="mb-6">
          <h2 className="font-heading text-2xl text-[#0F3057]">Referral Program</h2>
          <p className="text-[#5C636A]">Track referral performance across the platform</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <StatCard 
            icon={Users} 
            label="Total Referrals" 
            value={stats?.referral_stats?.total_referrals || 0}
            color="blue"
          />
          <StatCard 
            icon={CheckCircle} 
            label="Successful" 
            value={stats?.referral_stats?.successful_referrals || 0}
            color="green"
          />
          <StatCard 
            icon={Gift} 
            label="Pending" 
            value={(stats?.referral_stats?.total_referrals || 0) - (stats?.referral_stats?.successful_referrals || 0)}
            color="gold"
          />
        </div>

        {/* Referral Tier Info */}
        <div className="bg-white border border-[#E5E5DF] p-6">
          <h3 className="font-medium text-[#0F3057] mb-4">Referral Tier System</h3>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { name: 'Bronze', threshold: '0+', reward: '$10', color: 'bg-[#CD7F32]/10 text-[#CD7F32]' },
              { name: 'Silver', threshold: '5+', reward: '$15', color: 'bg-gray-200 text-gray-600' },
              { name: 'Gold', threshold: '15+', reward: '$20', color: 'bg-[#FFD700]/10 text-[#B8860B]' },
              { name: 'Platinum', threshold: '30+', reward: '$25', color: 'bg-gray-100 text-gray-500' },
              { name: 'Ambassador', threshold: '50+', reward: '$30', color: 'bg-purple-100 text-purple-600' }
            ].map((tier) => (
              <div key={tier.name} className={`p-4 text-center ${tier.color} rounded`}>
                <Award className="h-6 w-6 mx-auto mb-2" />
                <p className="font-medium">{tier.name}</p>
                <p className="text-xs opacity-70">{tier.threshold} referrals</p>
                <p className="font-heading text-lg mt-1">{tier.reward}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#0F3057] p-6 text-white">
        <h3 className="font-heading text-xl mb-4">Automation Tips</h3>
        <ul className="space-y-2 text-white/80 text-sm">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 mt-0.5 text-[#7CB798]" />
            Cart abandonment emails work best when sent 24-48 hours after cart activity stops
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 mt-0.5 text-[#7CB798]" />
            Welcome series emails help new users understand the value of collecting Sri Lankan art
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 mt-0.5 text-[#7CB798]" />
            Referral rewards are automatically credited when referred users complete their first order
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminAutomationPanel;
