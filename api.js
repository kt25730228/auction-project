import { supabase } from "./supabase.js";

/* ========================
   ✔ AUTH (로그인/회원가입)
   ======================== */

export async function signup({ email, password, name, phone, birth }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, phone, birth }
    }
  });
  if (error) throw error;
  return data.user;
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data.user;
}

export async function logout() {
  await supabase.auth.signOut();
}


/* ========================
   ✔ PRODUCTS
   ======================== */

export async function createProduct(product) {
  const user = await supabase.auth.getUser();
  const userId = user.data.user.id;

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        ...product,
        seller: userId
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function loadProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*, bids(price), users(name)")
    .order("id", { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}


/* ========================
   ✔ BIDS (입찰)
   ======================== */

export async function placeBid(productId, price) {
  const user = await supabase.auth.getUser();
  const userId = user.data.user.id;

  const { data, error } = await supabase
    .from("bids")
    .insert([
      {
        product_id: productId,
        user_id: userId,
        price
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}


/* ========================
   ✔ BUY NOW (즉시 구매)
   ======================== */

export async function buyNow(productId, amount) {
  const user = await supabase.auth.getUser();
  const userId = user.data.user.id;

  // 1) bids에 기록
  await supabase.from("bids").insert([
    {
      product_id: productId,
      user_id: userId,
      price: amount
    }
  ]);

  // 2) product sold 처리
  await supabase
    .from("products")
    .update({
      sold: true,
      winner: userId,
      winningPrice: amount
    })
    .eq("id", productId);
}
