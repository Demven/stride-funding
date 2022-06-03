const DEFAULT_PAGE_TITLE = 'Stride Funding';

export function updatePageTitle (pageTitle?:string) {
  document.title = pageTitle ? `${pageTitle} | ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE;
}
