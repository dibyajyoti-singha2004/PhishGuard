import PageWrapper from "../components/common/PageWrapper";

export default function Architecture() {
  return (
    <PageWrapper>
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Architecture</h1>

        <p>User → React → FastAPI → ML Model → Result</p>
      </div>
    </PageWrapper>
  );
}