#!/bin/bash

echo "Deploying TodoPro to EKS..."

# Apply all resources
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-service.yaml

echo "Waiting for MongoDB..."
kubectl wait --for=condition=available --timeout=300s deployment/mongo-deployment -n todoapp

kubectl apply -f todoapp-deployment.yaml
kubectl apply -f todoapp-service.yaml

echo "Waiting for TodoApp..."
kubectl wait --for=condition=available --timeout=300s deployment/todoapp-deployment -n todoapp

echo "Deployment completed!"
echo "Getting LoadBalancer URL..."
kubectl get service todoapp-service -n todoapp