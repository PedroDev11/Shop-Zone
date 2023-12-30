from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.utils.text import slugify
from rest_framework.permissions import IsAuthenticated

from .models import Product
from .serializers import ProductSerializer, ReviewSerializer
from backend.pagination import CustomPagination

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    pagination = CustomPagination()
    paginated_products = pagination.paginate_queryset(products, request)
    serializer = ProductSerializer(paginated_products, many=True)
    return pagination.get_paginated_response(serializer.data)

@api_view(['GET'])
def get_product(request, slug):
    products = Product.objects.get(slug=slug)
    serializer = ProductSerializer(products, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def get_product_admin(request, id):
    products = Product.objects.get(id=id)
    serializer = ProductSerializer(products, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def search(request):
    query = request.query_params.get('query')
    if query is None:
        query = ''
    product = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(product, many=True)
    return Response({'products': serializer.data})

# Filtramos los productos según su categoría
@api_view(['GET'])
def get_product_by_category(request, category):
    products = Product.objects.filter(category=category)
    serializar = ProductSerializer(products, many=True)
    return Response(serializar.data)

# Crear Producto
@api_view(['POST'])
def create_product(request):
    if request.user.is_staff:
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            name = serializer._validated_data['name']
            category = serializer._validated_data['category']
            slugPlus = name + category
            slug = slugify(slugPlus)
            
            if serializer.Meta.model.objects.filter(slug=slug).exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            serializer.save(user=request.user, slug=slug)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
# Crear Review
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_review(request, pk):
    serializer = ReviewSerializer(data=request.data)
    product = Product.objects.get(pk=pk)
    if serializer.is_valid():
        serializer.save(user=request.user, product=product)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def edit_product(request, pk):
    product = Product.objects.get(pk=pk)
    if request.user.is_staff:
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            name = serializer._validated_data['name']
            category = serializer._validated_data['category']
            slugPlus = name + category
            slug = slugify(slugPlus)
            
            if serializer.Meta.model.objects.filter(slug=slug).exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            serializer.save(user=request.user, slug=slug)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['DELETE'])
def delete_product(request, pk):
    product = Product.objects.get(pk=pk)
    if request.user.is_staff:
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else: 
        return Response(status=status.HTTP_401_UNAUTHORIZED)