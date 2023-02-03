import { timeSince } from "../utils/datetime";

const List = ({ items }) => {
  const ten = items.length > 10 ? items.slice(0, 10) : items;

  return (
  <ul className="divide-y divide-gray-200">
    {Array.isArray(ten) && !ten.length ?
      <div className="text-center py-20">
        <h3 className="mt-2 text-sm font-medium text-gray-800">Nothing to show</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by searching a stock.</p>
      </div>
      : ten.map((item) => (
        <li
          key={`${item.name}-${item.price}`}
          className="relative bg-neutral-100 py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-neutral-200 hover:bg-white/50"
        >
          <div className="flex justify-between space-x-3">
            <div className="flex-shrink-0">
              <img className="h-12 w-12 rounded-full bg-neutral-400" src={item.logo} alt="" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-left block focus:outline-none py-1">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="truncate text-sm font-medium text-gray-900">{item.symbol}</p>
                <p className="truncate text-sm text-gray-500">
                  {item?.name || 'Not found'} • {item?.price}
                  </p>
              </div>
            </div>
            {/* For improvement: have timeSince update every minute */}
            <time dateTime={item.datetime} className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
              {timeSince(item.datetime)} ago
            </time>
          </div>
        </li>
      ))}
  </ul>
)};

export default List;