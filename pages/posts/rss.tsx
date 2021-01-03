import { GetServerSideProps } from "next";

const Rss: React.VFC = () => <></>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = context.res;

  res.setHeader("Content-Type", "text/xml");
  res.write("RSS Feed");
  res.end();

  return { props: {}}
}

export default Rss;