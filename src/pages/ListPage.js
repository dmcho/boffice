import React from "react";

import * as listActions from "store/modules/list";
import { bindActionCreators } from "redux";

const ListPage = () => {
  return <div>List</div>;
};

ListPage.preload = (dispatch, params) => {
  const { page = 1, tag } = params;
  const ListActions = bindActionCreators(listActions, dispatch);
  return ListActions.getPostList({
    page,
    tag
  });
};

export default ListPage;
