import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return (
    <div>
      <Head>
        <title>Cafe Frontendc</title>
      </Head>
    </div>
  );
}
