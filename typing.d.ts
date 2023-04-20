import { ParsedUrlQuery } from 'querystring';

interface CustomParsedUrlQuery {
  q: string;
  searchType: string;
  start: string;
}
interface Image {
  contextLink:string;
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
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  image: Image;
}

export interface ResultGoogle {
  items: Item[];
  searchInformation: SearchInformation;
}
