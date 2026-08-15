# Render Deployment Guide for AbleSpace Backend

## Problem: MongoDB Connection Error

When deploying the backend to Render, you may encounter this error:
```
MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster
```

This happens because:
1. **IP Whitelist Issue**: Render's IP is not whitelisted in MongoDB Atlas
2. **SSL/TLS Configuration**: Connection settings weren't optimized for MongoDB Atlas
3. **Environment Variable**: `MONGODB_URI` not set in Render dashboard

## Solution Steps

### 1. Configure MongoDB Atlas IP Whitelist

**Option A: Allow All IPs (Easier for Development)**
1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Select your cluster → **Network Access**
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** (adds `0.0.0.0/0`)
5. Confirm

**Option B: Add Render's Specific IP (More Secure)**
1. Deploy to Render and check the error logs
2. Find Render's IP in the deployment logs
3. Add it to MongoDB Atlas Network Access whitelist
4. Redeploy on Render

### 2. Set Environment Variable on Render

1. Go to your Render dashboard
2. Select your **ablespace-backend** service
3. Click **Environment** tab
4. Add environment variable:
   - **Key**: `MONGODB_URI`
   - **Value**: Your MongoDB Atlas connection string (see format below)

**MongoDB Atlas Connection String Format:**
```
mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/ablespace?retryWrites=true&w=majority&ssl=true
```

**To find your connection string:**
1. Go to MongoDB Atlas → Your Cluster
2. Click **Connect** button
3. Choose "Connect your application"
4. Copy the connection string and replace:
   - `<username>`: Your database user
   - `<password>`: Your database password
   - Keep the rest as is

### 3. Redeploy on Render

1. Go to your Render service
2. Click **Manual Deploy** → **Deploy latest commit**
3. Watch the logs - deployment should succeed now

## Verification

You should see logs like:
```
[Nest] XX - MM/DD/YYYY, HH:MM:SS AM     LOG [NestFactory] Starting Nest application...
[Nest] XX - MM/DD/YYYY, HH:MM:SS AM     LOG [InstanceLoader] MongooseModule dependencies initialized
[Nest] XX - MM/DD/YYYY, HH:MM:SS AM     LOG [NestFactory] Nest application successfully started
```

## Troubleshooting

### Still Getting Connection Error?

1. **Verify IP Whitelist**: 
   - Check MongoDB Atlas Network Access shows `0.0.0.0/0` or your IP

2. **Check MONGODB_URI**:
   - Ensure no typos in connection string
   - Verify username/password are correct
   - Make sure database name is correct

3. **Check Render Environment Variables**:
   - Redeploy after adding environment variable
   - Variables only apply to new deployments

4. **Test Connection String Locally**:
   - Copy your MONGODB_URI to `.env` file
   - Run `npm run start:dev` locally
   - If it works locally but not on Render, the issue is the IP whitelist

### Port Issues

The app listens on `process.env.PORT` (set by Render) or port 3001. Render should auto-detect this. If you see "No open HTTP ports detected":
1. Check that `main.ts` has `await app.listen(port)`
2. Redeploy the service

## Security Notes

⚠️ **Important**: 
- Never commit your `.env` file with real credentials
- Use environment variables in Render dashboard, not hardcoded values
- Use a strong database password
- Consider restricting IP access instead of `0.0.0.0/0` for production

## Files Modified

- `backend/src/app.module.ts`: Added MongoDB connection options for better stability
- `backend/.env.example`: Updated with proper MongoDB Atlas format
- `render.yaml`: Already configured to use `MONGODB_URI` environment variable

## Additional Resources

- [MongoDB Atlas IP Whitelist](https://www.mongodb.com/docs/atlas/security-whitelist/)
- [MongoDB Atlas Connection Strings](https://www.mongodb.com/docs/manual/reference/connection-string/)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [NestJS Mongoose Configuration](https://docs.nestjs.com/techniques/mongodb)
