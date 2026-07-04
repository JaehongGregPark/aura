from django.test import SimpleTestCase


class HomePageTests(SimpleTestCase):
    def test_home_page_returns_200(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)

    def test_home_page_renders_expected_template(self):
        response = self.client.get("/")
        self.assertTemplateUsed(response, "index.html")

    def test_home_page_references_static_assets(self):
        response = self.client.get("/")
        content = response.content.decode()
        self.assertIn("aura/app.js", content)
        self.assertIn("aura/data.js", content)
