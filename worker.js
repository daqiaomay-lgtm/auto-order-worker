export default {
  async scheduled(event, env, ctx) {
    const masterUrl = `${env.KINTONE_BASE_URL}/k/v1/records.json?app=${env.KINTONE_MASTER_APP_ID}`;
    const stockUrl  = `${env.KINTONE_BASE_URL}/k/v1/records.json?app=${env.KINTONE_STOCK_APP_ID}`;

    const [masterRes, stockRes] = await Promise.all([
      fetch(masterUrl, { headers: { "X-Cybozu-API-Token": env.KINTONE_MASTER_API_TOKEN } }),
      fetch(stockUrl,  { headers: { "X-Cybozu-API-Token": env.KINTONE_STOCK_API_TOKEN } }),
    ]);

    if (!masterRes.ok) console.error("master error", masterRes.status, await masterRes.text());
    if (!stockRes.ok)  console.error("stock error",  stockRes.status,  await stockRes.text());

    const master = masterRes.ok ? await masterRes.json() : null;
    const stock  = stockRes.ok  ? await stockRes.json()  : null;

    console.log("master records:", master?.records?.length ?? "NG");
    console.log("stock records:",  stock?.records?.length ?? "NG");
  }
};



