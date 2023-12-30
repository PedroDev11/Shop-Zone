from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 9
    page_query_param = 'page'
    
    def get_paginated_response(self, data):
        return Response({
            'data': data, # el array de productos seria data
            'meta': { # Links para pasar de pagina
                'next': self.page.next_page_number()
                if self.page.has_next() else None, # Nos devuelve el siguiente numero de la pagina
                'previous': self.page.previous_page_number()
                if self.page.has_previous() else None,
                'count': self.page.paginator.count
            }
        })