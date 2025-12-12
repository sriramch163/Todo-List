#!/bin/bash

echo "🚀 Deploying TodoPro to Kubernetes..."

# Apply namespace
kubectl apply -f namespace.yaml

# Apply ConfigMap and Secret
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml

# Apply MongoDB resources
kubectl apply -f mongo-pv.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-service.yaml

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/mongo-deployment -n todoapp

# Apply TodoApp resources
kubectl apply -f todoapp-deployment.yaml
kubectl apply -f todoapp-service.yaml

# Optional: Apply Ingress
#kubectl apply -f ingress.yaml

# Wait for TodoApp to be ready
echo "⏳ Waiting for TodoApp to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/todoapp-deployment -n todoapp

# Get service information
echo "✅ Deployment completed!"
echo ""
echo "📋 Service Information:"
kubectl get services -n todoapp
echo ""
echo "🔍 Pod Status:"
kubectl get pods -n todoapp
echo ""
echo "🌐 Access your application:"
kubectl get service todoapp-service -n todoapp