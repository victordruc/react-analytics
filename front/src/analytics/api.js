export const postAction = async (endpoint, action) => {
    return await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actionList: action
        }),
      });
}