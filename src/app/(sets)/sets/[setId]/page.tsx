// import { serverClient } from "~/utils/server-client";
// import { trpc } from "~/utils/trpc";

// export async function generateStaticParams() {
//   const sets = ["set-one", "set-two"];
//   const result = await serverClient.example.getAll();
//   console.log(result);
//   return sets.map((set) => {
//     return {
//       setId: set,
//     };
//   });
// }

export default function SetPage({ params }: { params: { setId: string } }) {
  console.log(params);
  return (
    <div>
      <h1>set page</h1>
      <p>{params.setId}</p>
    </div>
  );
}
