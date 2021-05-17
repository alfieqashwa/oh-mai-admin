import { GlassHeader } from 'components/glassHeader';
import { Header } from 'components/header';
import { TitleWithBackButton } from 'components/titleWithBackButton';
import { LeaderBoardBorder, PaginationSummary } from 'components/analytics/summary';

export default function TopCustomer() {
  return (
    <div className="pr-12 pl-7">
      {/* Header? */}
      <Header title="Analytics - Summary - Top Customer" />
      <GlassHeader title="top customer">
        <div className="flex space-x-4">
          <button className="px-5 py-2 uppercase bg-transparent border w250-m text-N0">export</button>
        </div>
      </GlassHeader>

      {/* Title */}
      <TitleWithBackButton path="/analytics/summary" title="top customer" />

      {/* Leaderboard Border */}
      <LeaderBoardBorder />

      {/* Table */}
      <h1 className="flex items-center justify-center h-48 my-16">TODO: TABLE LIST</h1>

      {/* Pagination */}
      <PaginationSummary />

    </div>
  )
}