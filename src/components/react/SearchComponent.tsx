import { useState } from "react";

/**
 * @HTML Input
 *  @Event onFocus
 *      Check if JSON Is loaded (.lentgh > 0)
 *      If not make Fetch of /seach.json in an array (useState) called Posts
 *  @Event onChange:
 *      Save search input in a variable (useState) called InputSearch
 *      If input don't has information, set list of results in blank

 * @HTML List of results
 *      Show mapped JSON formatted with links and all stuff
 */
const SearchComponent = () => {
  // Text of search input
  const [InputSearch, setInputSearch] = useState(""); // Posts list to filter

  //All posts list to search
  const [Posts, setPosts] = useState([]);

  const onChangeInputSearch = (event: string) => setInputSearch(event);

  const onFocusInputSearch = async () => {
    //If posts is clear
    if (Posts.length === 0) {
      //Get the posts
      const response = await fetch("/search.json");
      const data = await response.json();
      setPosts(data);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center mx-auto my-4 w-2/4">
        <label
          htmlFor="search-input"
          className=" bg-white border-b-2 border-black flex w-full"
        >
          <span>🔍</span>
          <input
            type="text"
            onClick={onFocusInputSearch}
            onChange={($event) => onChangeInputSearch($event.target.value)}
            className="border-none bg-transparent p-1 w-full"
            id="search-input"
            value={InputSearch}
          />
        </label>
        <section className="bg-white my-4 p-4">
          {
          InputSearch.length > 0 &&
            Posts.filter((post: any) => {
              return (
                post.title.toLowerCase().includes(InputSearch.toLowerCase()) ||
                post.description.toLowerCase().includes(InputSearch.toLowerCase()) ||
                post.slug.toLowerCase().includes(InputSearch.toLowerCase())
              );
            }).map((post: any) => (
              <article className="border-b-2 border-teal-400 mb-2">
                <a href={`/blog/${post.slug}`}>{post.title}</a>
                <p>{post.description}</p>
              </article>
            ))
            }
        </section>
      </div>
    </>
  );
};
export default SearchComponent;
