// export interface Url {
//   type: string;
//   template: string;
// }
// export interface Queries {
//   queries:{

import { ParsedUrlQuery } from 'querystring';

//   }
// }
// export interface Context {}

interface CustomParsedUrlQuery {
  q: string;
  searchType: string;
  start: string;
}

export interface SearchInformation {
  searchTime: string;
  formattedSearchTime: string;
  totalResults: string;
  formattedTotalResults: string;
}
export interface Item {
  title: string;
  kind: string;
  htmlTitle: string;
  link: number;
  displayLink: number;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
}

export interface ResultGoogle {
  items: Item[];
  searchInformation: SearchInformation;
}
