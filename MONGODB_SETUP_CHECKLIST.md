# MongoDB Atlas + Render Deployment Checklist

Follow these steps to fix the MongoDB connection error on Render:

## ✅ Step 1: MongoDB Atlas Network Access (CRITICAL)

- [ ] Go to [MongoDB Atlas](https://cloud.mongodb.com/)
- [ ] Click your cluster → **Network Access** tab
- [ ] Look for IP Whitelist entries
- [ ] **ADD**: `0.0.0.0/0` (Allow all IPs) OR your Render IP
  - To find Render IP: Check Render deployment logs for the actual error
  - Click **Add IP Address** → **Allow Access from Anywhere** (easiest)
- [ ] Confirm the change

## ✅ Step 2: Get MongoDB Connection String

- [ ] In MongoDB Atlas, click **Connect** button on your cluster
- [ ] Choose **Connect your application**
- [ ] Copy the connection string
- [ ] Format should be: `mongodb+srv://username:password@cluster.mongodb.net/ablespace?retryWrites=true&w=majority&ssl=true`
- [ ] Replace `<username>`, `<password>`, and `<cluster-name>` with actual values

## ✅ Step 3: Set Environment Variable on Render

- [ ] Go to [Render Dashboard](https://dashboard.render.com/)
- [ ] Select **ablespace-backend** service
- [ ] Click **Environment** tab
- [ ] Click **Add Environment Variable**
  - Key: `MONGODB_URI`
  - Value: [Your MongoDB connection string from Step 2]
- [ ] Save

## ✅ Step 4: Redeploy

- [ ] On Render dashboard, click your backend service
- [ ] Click **Manual Deploy** → **Deploy latest commit**
- [ ] Wait for deployment to complete
- [ ] Check logs - should see: `✅ Backend server is running on port`

## ✅ Step 5: Verify

In Render logs, you should see:
```
[Nest] 67  - 08/15/2026, 1:04:38 PM     LOG [NestFactory] Starting Nest application...
[Nest] 67  - 08/15/2026, 1:04:38 PM     LOG [InstanceLoader] MongooseModule dependencies initialized
✅ Backend server is running on port 10000
```

If you still see the connection error, check:
- [ ] MONGODB_URI is set in Render Environment
- [ ] Connection string has correct username/password
- [ ] MongoDB Atlas Network Access has `0.0.0.0/0` or your IP whitelisted
- [ ] Connection string has `?ssl=true` at the end

## 🔗 Useful Links

- MongoDB Atlas IP Whitelist: https://www.mongodb.com/docs/atlas/security-whitelist/
- Render Environment Variables: https://render.com/docs/environment-variables
- See full guide: `RENDER_DEPLOYMENT_GUIDE.md`
