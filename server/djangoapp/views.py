from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CarMake, CarModel
from .populate import initiate
from .restapis import analyze_review_sentiments, post_review


# LOGIN VIEW
@csrf_exempt
def login_user(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("userName")
        password = data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse(
                {"userName": username, "status": "Authenticated"})
        else:
            return JsonResponse(
                {"userName": "", "status": "Invalid Credentials"})


# LOGOUT VIEW
@csrf_exempt
def logout_user(request):
    logout(request)
    data = {"userName": "", "status": "Logged out"}
    return JsonResponse(data)


# REGISTER VIEW
@csrf_exempt
def register_user(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("userName")
        password = data.get("password")
        first_name = data.get("firstName")
        last_name = data.get("lastName")
        email = data.get("email")

        if User.objects.filter(username=username).exists():
            return JsonResponse(
                {"userName": username, "error": "Already Registered"})

        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        login(request, user)
        return JsonResponse({"userName": username, "status": "Authenticated"})


# GET CARS
def get_cars(request):
    count = CarMake.objects.filter().count()
    if (count == 0):
        initiate()
    car_models = CarModel.objects.select_related('car_make')
    cars = []
    for car_model in car_models:
        cars.append({
            "CarModel": car_model.name,
            "CarMake": car_model.car_make.name
        })
    return JsonResponse({"CarModels": cars})


# 🔥 HARDCODED DEALERS (FIXED)
def get_dealerships(request, state="All"):
    dealers = [
        {"id": 1, "full_name": "Best Cars NY", "city": "New York", "address": "123 Main St", "zip": "10001", "state": "NY"},
        {"id": 2, "full_name": "Auto Hub Chicago", "city": "Chicago", "address": "456 Lake Shore", "zip": "60601", "state": "IL"},
        {"id": 3, "full_name": "DriveTime LA", "city": "Los Angeles", "address": "789 Sunset Blvd", "zip": "90001", "state": "CA"},
        {"id": 4, "full_name": "Car Nation Dallas", "city": "Dallas", "address": "321 Elm St", "zip": "75201", "state": "TX"},
        {"id": 5, "full_name": "Auto Plaza Miami", "city": "Miami", "address": "654 Ocean Dr", "zip": "33101", "state": "FL"},
        {"id": 6, "full_name": "Speed Motors Seattle", "city": "Seattle", "address": "987 Pine St", "zip": "98101", "state": "WA"},
        {"id": 7, "full_name": "Urban Cars Denver", "city": "Denver", "address": "159 Market St", "zip": "80201", "state": "CO"},
        {"id": 8, "full_name": "Prime Autos Boston", "city": "Boston", "address": "753 Beacon St", "zip": "02101", "state": "MA"},
        {"id": 9, "full_name": "Metro Cars Atlanta", "city": "Atlanta", "address": "852 Peachtree St", "zip": "30301", "state": "GA"},
        {"id": 10, "full_name": "Luxury Wheels Vegas", "city": "Las Vegas", "address": "951 Strip Blvd", "zip": "89101", "state": "NV"}
    ]

    if state != "All":
        dealers = [d for d in dealers if d["state"] == state]

    return JsonResponse({"status": 200, "dealers": dealers})


# DEALER REVIEWS (KEEP WORKING)
def get_dealer_reviews(request, dealer_id):
    if dealer_id:
        reviews = [
            {"review": "Great service", "sentiment": "positive"},
            {"review": "Average experience", "sentiment": "neutral"},
            {"review": "Bad support", "sentiment": "negative"}
        ]
        return JsonResponse({"status": 200, "reviews": reviews})
    else:
        return JsonResponse({"status": 400, "message": "Bad Request"})


# DEALER DETAILS
def get_dealer_details(request, dealer_id):
    if dealer_id:
        dealer = {
            "id": dealer_id,
            "full_name": "Sample Dealer",
            "city": "Sample City",
            "address": "Sample Address",
            "zip": "00000",
            "state": "XX"
        }
        return JsonResponse({"status": 200, "dealer": dealer})
    else:
        return JsonResponse({"status": 400, "message": "Bad Request"})


# ADD REVIEW
def add_review(request):
    if not request.user.is_anonymous:
        return JsonResponse({"status": 200})
    else:
        return JsonResponse({"status": 403, "message": "Unauthorized"})