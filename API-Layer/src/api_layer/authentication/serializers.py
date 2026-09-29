from djangorestframework.rest_framework.serializers import ModelSerializer
from .models import MedicalUser

class MedicalUserSerializer(ModelSerializer):

    class meta:
        model =  MedicalUser
        fields = '__all__'

    def create_instance(self, validated_data):
        return MedicalUser.objects.create(**validated_data)

    def update_instance(Self, instance, validated_data):
