function TodoFilters({
  filter,
  setFilter,
  search,
  setSearch,
}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="search-input"
      />

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
        className="filter-select"
      >
        <option value="All">All</option>
        <option value="Completed">
          Completed
        </option>
        <option value="Pending">
          Pending
        </option>
      </select>
    </div>
  );
}

export default TodoFilters;