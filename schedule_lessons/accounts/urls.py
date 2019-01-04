'''This module is used to create routes after /accounts/'''
from django.urls import path, include
from . import views
from allauth.account.views import (logout, email, login, signup, password_reset,
                                   password_reset_done, password_reset_from_key,
                                   password_reset_from_key_done)


urlpatterns = [
    path('signup/', signup, name='account_signup'),
    path('personalize/', views.personalize_view, name='personalize'),
    path('login/', login, name='account_login'),
    path('logout/', logout, name='account_logout'),
    path('email/', email, name='account_email'),
    path('reset_password/', password_reset, name='account_reset_password'),
    path('reset_password/done/', password_reset_done, name='account_reset_password_done'),
    path('reset_password_key/<uidb36>/<key>/', password_reset_from_key, name='account_reset_password_from_key'),
    path('reset_password_key/done', password_reset_from_key_done, name='account_reset_password_from_key_done'),
]
