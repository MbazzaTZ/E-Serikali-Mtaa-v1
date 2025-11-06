export async function fakeSubmit(data: any) {
  console.log("Submitted data:", data);
  await new Promise((res) => setTimeout(res, 1000));
  return { success: true };
}
