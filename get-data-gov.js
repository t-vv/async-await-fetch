export default class getGovData {
  async getStories() {
    const ids = await (
      await fetch("https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json")
    ).json();
    return ids;
  }
}
