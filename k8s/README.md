# TodoPro Kubernetes Deployment

## 📋 **Overview**

This directory contains Kubernetes manifest files to deploy the TodoPro application using your Docker images:
- `sriram084/todo:latest` - TodoApp
- `sriram084/mongo:latest` - MongoDB

## 📁 **Files Structure**

```
k8s/
├── namespace.yaml           # Kubernetes namespace
├── configmap.yaml          # Application configuration
├── secret.yaml             # Sensitive data (session secret)
├── mongo-pv.yaml           # MongoDB persistent storage
├── mongo-deployment.yaml   # MongoDB deployment
├── mongo-service.yaml      # MongoDB service
├── todoapp-deployment.yaml # TodoApp deployment
├── todoapp-service.yaml    # TodoApp service (LoadBalancer)
├── ingress.yaml            # Ingress controller (optional)
├── deploy.sh               # Automated deployment script
└── README.md               # This file
```

## 🚀 **Quick Deployment**

### **Option 1: Automated Script**
```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### **Option 2: Manual Deployment**
```bash
# 1. Create namespace
kubectl apply -f namespace.yaml

# 2. Apply configuration
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml

# 3. Deploy MongoDB
kubectl apply -f mongo-pv.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-service.yaml

# 4. Deploy TodoApp
kubectl apply -f todoapp-deployment.yaml
kubectl apply -f todoapp-service.yaml

# 5. Optional: Apply Ingress
kubectl apply -f ingress.yaml
```

## 🔧 **Configuration**

### **Environment Variables (ConfigMap)**
- `NODE_ENV`: production
- `PORT`: 3000
- `MONGODB_URI`: mongodb://mongo-service:27017/todolist

### **Secrets**
- `SESSION_SECRET`: Base64 encoded session secret

### **Resources**
- **TodoApp**: 2 replicas, 128Mi-256Mi memory, 100m-200m CPU
- **MongoDB**: 1 replica, 256Mi-512Mi memory, 250m-500m CPU
- **Storage**: 5Gi persistent volume for MongoDB

## 🔍 **Monitoring & Management**

### **Check Deployment Status**
```bash
# Check all resources
kubectl get all -n todoapp

# Check pods
kubectl get pods -n todoapp

# Check services
kubectl get services -n todoapp

# Check persistent volumes
kubectl get pv,pvc -n todoapp
```

### **View Logs**
```bash
# TodoApp logs
kubectl logs -f deployment/todoapp-deployment -n todoapp

# MongoDB logs
kubectl logs -f deployment/mongo-deployment -n todoapp
```

### **Access Application**
```bash
# Get service external IP
kubectl get service todoapp-service -n todoapp

# Port forward for local access
kubectl port-forward service/todoapp-service 3000:80 -n todoapp
```

## 🌐 **Access Methods**

### **LoadBalancer Service**
- External IP will be assigned by cloud provider
- Access via: `http://<EXTERNAL-IP>`

### **NodePort (Alternative)**
Change service type to NodePort in `todoapp-service.yaml`:
```yaml
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: 3000
    nodePort: 30000
```

### **Ingress Controller**
- Configure domain in `ingress.yaml`
- Access via: `http://todoapp.local`

## 🔒 **Security Features**

- **Namespace Isolation**: Dedicated namespace
- **Resource Limits**: CPU and memory constraints
- **Health Checks**: Liveness and readiness probes
- **Secrets Management**: Encrypted sensitive data
- **Network Policies**: Can be added for network isolation

## 🛠️ **Troubleshooting**

### **Common Issues**

#### Pods Not Starting
```bash
# Check pod events
kubectl describe pod <pod-name> -n todoapp

# Check logs
kubectl logs <pod-name> -n todoapp
```

#### MongoDB Connection Issues
```bash
# Test MongoDB connectivity
kubectl exec -it deployment/mongo-deployment -n todoapp -- mongosh

# Check service DNS
kubectl exec -it deployment/todoapp-deployment -n todoapp -- nslookup mongo-service
```

#### Storage Issues
```bash
# Check persistent volumes
kubectl get pv,pvc -n todoapp

# Check storage class
kubectl get storageclass
```

## 📊 **Scaling**

### **Scale TodoApp**
```bash
# Scale to 5 replicas
kubectl scale deployment todoapp-deployment --replicas=5 -n todoapp
```

### **Horizontal Pod Autoscaler**
```bash
# Create HPA
kubectl autoscale deployment todoapp-deployment --cpu-percent=70 --min=2 --max=10 -n todoapp
```

## 🗑️ **Cleanup**

### **Remove Application**
```bash
# Delete all resources
kubectl delete namespace todoapp

# Or delete individual resources
kubectl delete -f .
```

### **Remove Persistent Data**
```bash
# Delete persistent volumes (data will be lost)
kubectl delete pv mongo-pv
```

## 📝 **Notes**

- **Persistent Storage**: MongoDB data persists across pod restarts
- **High Availability**: TodoApp runs with 2 replicas
- **Health Monitoring**: Built-in health checks
- **Resource Management**: CPU and memory limits configured
- **Cloud Ready**: Works with EKS, GKE, AKS

## 🎯 **Production Considerations**

- Use managed MongoDB (Atlas) for production
- Configure proper ingress with SSL/TLS
- Set up monitoring (Prometheus/Grafana)
- Implement backup strategies
- Configure network policies
- Use secrets management (Vault, etc.)

---

**Kubernetes deployment ready! 🎉**