import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, []);

  return (
    <div>
      <Head>
        <title>Food Time</title>
      </Head>
    </div>
  );
}
