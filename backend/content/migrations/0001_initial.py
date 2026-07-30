from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Achievement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student_name', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
                ('date', models.DateField(blank=True, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='achievements/')),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', models.SlugField(unique=True)),
                ('body', models.TextField()),
                ('category', models.CharField(choices=[('jurnal', 'Jurnal'), ('kajian', 'Kajian'), ('achievement', 'Achievement'), ('beasiswa', 'Beasiswa')], max_length=20)),
                ('published_at', models.DateTimeField(blank=True, null=True)),
                ('is_visible', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ['-published_at'],
            },
        ),
        migrations.CreateModel(
            name='ContactInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('instagram', models.URLField(blank=True)),
                ('tiktok', models.URLField(blank=True)),
                ('youtube', models.URLField(blank=True)),
                ('spotify', models.URLField(blank=True)),
                ('whatsapp', models.URLField(blank=True)),
                ('line', models.CharField(blank=True, max_length=100)),
                ('location', models.TextField(blank=True)),
                ('maps_embed', models.TextField(blank=True)),
            ],
            options={
                'verbose_name': 'Contact Info',
                'verbose_name_plural': 'Contact Info',
            },
        ),
        migrations.CreateModel(
            name='Division',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(unique=True)),
                ('group_photo', models.ImageField(blank=True, null=True, upload_to='divisions/')),
                ('jobdesc', models.TextField(blank=True)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='FAQ',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=300)),
                ('answer', models.TextField()),
                ('order', models.PositiveIntegerField(default=0)),
                ('is_visible', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name': 'FAQ',
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='FormSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('kritik_saran', 'Kritik & Saran'), ('request_seminar', 'Request Seminar')], max_length=20)),
                ('payload', models.JSONField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Form Submission',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slogan', models.CharField(blank=True, max_length=200)),
                ('visi', models.TextField(blank=True)),
                ('misi', models.TextField(blank=True)),
                ('nilai', models.JSONField(blank=True, default=list)),
                ('filosofi_logo', models.TextField(blank=True)),
                ('logo', models.ImageField(blank=True, null=True, upload_to='organization/')),
            ],
            options={
                'verbose_name': 'Organization',
                'verbose_name_plural': 'Organization',
            },
        ),
        migrations.CreateModel(
            name='ProgramKerja',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', models.SlugField(unique=True)),
                ('category', models.CharField(choices=[('event', 'Event'), ('workshop', 'Workshop'), ('seminar', 'Seminar'), ('competition', 'Competition'), ('pengmas', 'Pengabdian Masyarakat')], max_length=20)),
                ('description', models.TextField(blank=True)),
                ('date', models.DateField(blank=True, null=True)),
                ('cover_image', models.ImageField(blank=True, null=True, upload_to='programs/')),
                ('is_visible', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name': 'Program Kerja',
                'verbose_name_plural': 'Program Kerja',
                'ordering': ['-date'],
            },
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('page', models.CharField(choices=[('home', 'Home'), ('about', 'About SISO'), ('program', 'Program Kerja & Events'), ('contact', 'Contact')], max_length=30)),
                ('section_type', models.CharField(max_length=50)),
                ('is_visible', models.BooleanField(default=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('config', models.JSONField(blank=True, default=dict)),
            ],
            options={
                'ordering': ['page', 'order'],
            },
        ),
        migrations.CreateModel(
            name='MediaAsset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='media_assets/')),
                ('type', models.CharField(choices=[('photo', 'Photo'), ('video', 'Video')], max_length=10)),
                ('program', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='media_assets', to='content.programkerja')),
            ],
            options={
                'verbose_name': 'Media Asset',
            },
        ),
        migrations.CreateModel(
            name='BPHMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='members/')),
                ('role', models.CharField(max_length=100)),
                ('order', models.PositiveIntegerField(default=0)),
                ('generation_year', models.PositiveIntegerField()),
                ('division', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='members', to='content.division')),
            ],
            options={
                'ordering': ['generation_year', 'order'],
            },
        ),
    ]
