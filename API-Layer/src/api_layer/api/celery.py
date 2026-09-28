import os

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'proj.settings')

app = Celery('API-Layer',
             broker=os.environ.get("CELERY_BROKER_URL"),
             backend=os.environ.get("CELERY_BACKEND_RESULTS_URL"),
             include=['api.tasks'] )

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f'Request: {self.request!r}')