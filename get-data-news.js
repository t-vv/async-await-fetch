export default class getTopNews {
  async getStories() {
    const ids = await (
      await fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    ).json();
    const data = Promise.all(
      ids.map(
        async i =>
          await (
            await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${i}.json?print=pretty`
            )
          ).json()
      )
    );
    return data;
  }
}
