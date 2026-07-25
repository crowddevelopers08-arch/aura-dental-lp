export type BranchSlug = 'kondapur' | 'madinaguda';

export type BranchConfig = {
  slug: BranchSlug;
  /** Human label shown on the card and forwarded to TeleCRM / Sheets. */
  label: string;
  /** Google "leave a review" deep link for this specific location. */
  googleReviewLink: string;
  reviewHref: string;
  feedbackHref: string;
};

export const BRANCHES: Record<BranchSlug, BranchConfig> = {
  kondapur: {
    slug: 'kondapur',
    label: 'Kondapur',
    googleReviewLink: 'https://g.page/r/CdjOlxUzSdkiEBM/review',
    reviewHref: '/review/kondapur',
    feedbackHref: '/client-feedback/kondapur',
  },
  madinaguda: {
    slug: 'madinaguda',
    label: 'Madinaguda',
    googleReviewLink: 'https://g.page/r/CRI5XNczBJMVEBM/review',
    reviewHref: '/review/madinaguda',
    feedbackHref: '/client-feedback/madinaguda',
  },
};
