import React from 'react';
import { 
  ArrowUpDown, 
  LayoutGrid, 
  Columns2, 
  Map, 
  RotateCcw,
  SlidersHorizontal,
  X
} from 'lucide-react';
import './ControlsBar.css';

export default function ControlsBar({
  resultsCount = 0,
  currentSort = 'distance',
  onSortChange,
  viewMode = 'split',
  onViewModeChange,
  filters,
  onResetFilters,
  onRemoveFilter
}) {
  // Check active filters to display as removable tags
  const activeFilterTags = [];
  if (filters.type && filters.type !== 'all') {
    activeFilterTags.push({ key: 'type', label: `Type: ${filters.type.toUpperCase()}` });
  }
  if (filters.searchQuery) {
    activeFilterTags.push({ key: 'searchQuery', label: `"${filters.searchQuery}"` });
  }
  if (filters.gender && filters.gender !== 'Any') {
    activeFilterTags.push({ key: 'gender', label: `Gender: ${filters.gender}` });
  }
  if (filters.maxDistance && filters.maxDistance < 100) {
    activeFilterTags.push({ key: 'maxDistance', label: `≤ ${filters.maxDistance} km` });
  }
  if (filters.noBrokerage) {
    activeFilterTags.push({ key: 'noBrokerage', label: 'No Brokerage' });
  }
  if (filters.instantMoveIn) {
    activeFilterTags.push({ key: 'instantMoveIn', label: 'Instant Move-in' });
  }
  if (filters.furnished) {
    activeFilterTags.push({ key: 'furnished', label: 'Furnished' });
  }
  if (filters.ac) {
    activeFilterTags.push({ key: 'ac', label: 'AC' });
  }
  if (filters.meals) {
    activeFilterTags.push({ key: 'meals', label: 'Meals' });
  }
  if (filters.attachedBath) {
    activeFilterTags.push({ key: 'attachedBath', label: 'Attached Bath' });
  }
  if (filters.wifi) {
    activeFilterTags.push({ key: 'wifi', label: 'Wi-Fi' });
  }

  return (
    <div className="rf-controls">
      <div className="rf-controls__inner">
        {/* Left: Result Count & Active Badges */}
        <div className="rf-controls__left">
          <div className="rf-controls__count">
            <span className="rf-controls__count-num">{resultsCount}</span>
            <span className="rf-controls__count-text">
              {resultsCount === 1 ? 'room found' : 'rooms available near you'}
            </span>
          </div>

          {activeFilterTags.length > 0 && (
            <div className="rf-controls__active-tags">
              {activeFilterTags.map((tag) => (
                <span key={tag.key} className="rf-controls__tag">
                  {tag.label}
                  <button
                    className="rf-controls__tag-remove"
                    onClick={() => onRemoveFilter(tag.key)}
                    aria-label={`Remove ${tag.label}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              <button className="rf-controls__clear-all" onClick={onResetFilters}>
                <RotateCcw size={12} />
                <span>Reset all</span>
              </button>
            </div>
          )}
        </div>

        {/* Right: Sorting & View Mode Switches */}
        <div className="rf-controls__right">
          {/* Sort Dropdown */}
          <div className="rf-controls__sort-wrap">
            <ArrowUpDown size={14} className="rf-controls__sort-icon" />
            <span className="rf-controls__sort-label">Sort by:</span>
            <select
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="rf-controls__select"
            >
              <option value="distance">Nearest to me (GPS)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated & Verified</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="rf-controls__view-modes" role="group" aria-label="View switch">
            <button
              className={`rf-controls__view-btn ${viewMode === 'split' ? 'active' : ''}`}
              onClick={() => onViewModeChange('split')}
              title="Split View (List + Map)"
            >
              <Columns2 size={16} />
              <span className="rf-controls__view-name">Split</span>
            </button>
            <button
              className={`rf-controls__view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              title="Grid View Only"
            >
              <LayoutGrid size={16} />
              <span className="rf-controls__view-name">Grid</span>
            </button>
            <button
              className={`rf-controls__view-btn ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => onViewModeChange('map')}
              title="Map View Only"
            >
              <Map size={16} />
              <span className="rf-controls__view-name">Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
