# Ceylon Canvas - DigitalOcean Deployment Guide

## Prerequisites
- DigitalOcean Droplet (Ubuntu 22.04 recommended)
- Minimum: 2GB RAM, 1 vCPU (4GB RAM recommended for production)
- Domain name (optional but recommended)
- SSH access to your droplet

---

## Step 1: Initial Server Setup

```bash
# SSH into your droplet
ssh root@your_droplet_ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose-plugin -y

# Verify installation
docker --version
docker compose version
```

---

## Step 2: Clone Your Repository

```bash
# Create app directory
mkdir -p /var/www
cd /var/www

# Clone your repo
git clone https://github.com/tecsrilankaworldwide/ceylon-canvas-art-marketplace.git ceylon-canvas
cd ceylon-canvas
```

---

## Step 3: Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit with your values
nano .env
```

**Required values to set:**
- `JWT_SECRET` - Generate with: `openssl rand -hex 32`
- `REACT_APP_BACKEND_URL` - Your domain (e.g., https://ceyloncanvas.com) or http://your_droplet_ip
- `STRIPE_SECRET_KEY` - From Stripe Dashboard
- `RESEND_API_KEY` - From Resend Dashboard
- `SENDER_EMAIL` - Your verified sender email

---

## Step 4: Create Nginx Directory

```bash
mkdir -p nginx/ssl
```

---

## Step 5: Build and Start Services

```bash
# Build and start all services
docker compose up -d --build

# Check status
docker compose ps

# View logs
docker compose logs -f
```

---

## Step 6: Verify Deployment

```bash
# Check if services are running
docker compose ps

# Test backend health
curl http://localhost:8001/api/

# Test frontend
curl http://localhost:3000

# Test through nginx
curl http://localhost/api/
curl http://localhost/
```

---

## Step 7: Configure Domain & SSL (Recommended)

### Point your domain to the droplet:
1. In your domain registrar, create an A record:
   - Host: `@` or `ceyloncanvas.com`
   - Points to: `your_droplet_ip`
   - TTL: 3600

2. Optional: Create www subdomain:
   - Host: `www`
   - Points to: `your_droplet_ip`

### Install SSL with Certbot:

```bash
# Install certbot
apt install certbot -y

# Stop nginx temporarily
docker compose stop nginx

# Get SSL certificate
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Copy certificates
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/

# Update nginx.conf - uncomment SSL lines
nano nginx/nginx.conf

# Restart nginx
docker compose up -d nginx
```

---

## Step 8: Set Up Auto-Renewal for SSL

```bash
# Create renewal script
cat > /etc/cron.d/certbot-renewal << 'EOF'
0 0 1 * * root certbot renew --pre-hook "docker compose -f /var/www/ceylon-canvas/docker-compose.yml stop nginx" --post-hook "docker compose -f /var/www/ceylon-canvas/docker-compose.yml start nginx"
EOF
```

---

## Step 9: Configure Firewall

```bash
# Allow SSH, HTTP, HTTPS
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

---

## Useful Commands

```bash
# View all logs
docker compose logs -f

# View specific service logs
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongodb

# Restart all services
docker compose restart

# Restart specific service
docker compose restart backend

# Stop all services
docker compose down

# Stop and remove volumes (WARNING: deletes database!)
docker compose down -v

# Update application
cd /var/www/ceylon-canvas
git pull origin main
docker compose up -d --build

# Enter MongoDB shell
docker compose exec mongodb mongosh ceylon_canvas

# Backup MongoDB
docker compose exec mongodb mongodump --db ceylon_canvas --out /dump
docker cp ceylon-mongodb:/dump ./backup-$(date +%Y%m%d)
```

---

## Troubleshooting

### Backend not starting:
```bash
docker compose logs backend
# Check for missing environment variables or import errors
```

### Frontend build failing:
```bash
docker compose logs frontend
# Usually due to missing REACT_APP_BACKEND_URL
```

### MongoDB connection issues:
```bash
docker compose logs mongodb
# Ensure mongodb service is healthy before backend starts
```

### 502 Bad Gateway:
```bash
# Check if backend is running
docker compose ps
docker compose logs backend
# Restart if needed
docker compose restart backend
```

---

## Performance Optimization

### Enable swap (for 2GB droplet):
```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### MongoDB optimization:
Add to docker-compose.yml under mongodb:
```yaml
command: mongod --wiredTigerCacheSizeGB 0.5
```

---

## Monitoring (Optional)

### Install Netdata for monitoring:
```bash
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
# Access at http://your_droplet_ip:19999
```

---

## Your URLs After Deployment

- **Website**: http://your_droplet_ip or https://yourdomain.com
- **API**: http://your_droplet_ip/api/ or https://yourdomain.com/api/
- **Admin**: https://yourdomain.com/admin (login as admin@ceyloncanvas.com / admin123)

---

## Support

If you encounter issues:
1. Check logs: `docker compose logs -f`
2. Verify environment variables in `.env`
3. Ensure all ports are open in firewall
4. Check DigitalOcean droplet resources (CPU, memory, disk)

**Your Ceylon Canvas marketplace is ready for production!** 🎨
