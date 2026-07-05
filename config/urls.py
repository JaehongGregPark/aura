"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path("", TemplateView.as_view(template_name="index.html"), name="home"),
    path("api/content/", views.content_api, name="content_api"),
    path("api/admin-settings/", views.admin_settings_api, name="admin_settings_api"),
    path("aura-admin/", views.content_admin, name="content_admin"),
    path("aura-admin/save/", views.content_admin_save, name="content_admin_save"),
    path(
        "aura-admin/settings/save/",
        views.admin_settings_save,
        name="admin_settings_save",
    ),
    path("admin/", admin.site.urls),
]
