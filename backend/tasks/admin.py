from django.contrib import admin
from .models import UnappropriateEvent, EventsEmotion, Action, EventsAction

admin.site.register(UnappropriateEvent)
admin.site.register(EventsEmotion)
admin.site.register(Action)
admin.site.register(EventsAction)
