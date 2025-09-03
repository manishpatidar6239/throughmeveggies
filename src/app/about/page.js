import MainLayout from "@/components/layouts/MainLayout";

// app/about/page.tsx
export const metadata = {
  title: "About Us",
  description: "Learn more about our application",
};

export default function AboutPage() {
  return (
    <>
      <MainLayout>
        <h1>About Us</h1>
        <p>
          Welcome to our website! We are dedicated to building innovative
          solutions.
        </p>
      </MainLayout>
    </>
  );
}
