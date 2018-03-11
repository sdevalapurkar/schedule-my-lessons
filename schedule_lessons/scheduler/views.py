from django.shortcuts import render
from django.http import HttpResponse
from .models import Relationships
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

# Create your views here.

def home(request):
    if request.method == 'GET':
        return render(request, 'index.html')
    
    return HttpResponse(status=404)

@login_required
def add_tutor(request):
    if request.method == 'POST':
        data = request.body
        return HttpResponse(status=200)

    return HttpResponse(status=404)


def get_tutors(request):
    if request.method == 'GET':
        tutors = []
        print (request.user)
        clients_tutors = Relationships.objects.filter(client=request.user)

        lee = User.objects.filter(username='leezeitz')
        for user in lee:
            print (user.first_name)

        print('\n')

        for tutor in clients_tutors:
            print(tutor.tutor.profile.id)
            print(tutor.tutor)
            print('full name: ' + tutor.tutor.get_full_name())
            tutors.append([tutor.tutor.first_name, tutor.tutor.last_name, tutor.tutor.profile.id])

        
        return JsonResponse(tutors, safe=False)

        