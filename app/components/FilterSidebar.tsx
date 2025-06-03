'use client'

import { useEffect, useState } from 'react'
import { filters } from '../content/filters'
import { motion, AnimatePresence } from 'framer-motion'

interface FilterSidebarProps {
  isCollectionVisible: boolean
  onFilterChange: (filters: Record<string, string[]>) => void
}

export default function FilterSidebar({ isCollectionVisible, onFilterChange }: FilterSidebarProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [isOpen, setIsOpen] = useState(false)

  const filteredFilters = isCollectionVisible ? filters.filter(filter => filter.slug !== 'collection') : filters

  const handleOptionSelect = (filterTitle: string, optionValue: string) => {
    setSelectedFilters(prev => {
      const currentValues = prev[filterTitle] || []
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue]

      return {
        ...prev,
        [filterTitle]: newValues,
      }
    })
  }

  // ✅ Now call onFilterChange in a side effect (safe)
  useEffect(() => {
    onFilterChange(selectedFilters)
  }, [selectedFilters, onFilterChange])

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="xl:hidden absolute top-12 right-4 bg-menu-bg text-menu-text px-4 py-2 rounded-full shadow-lg z-50 flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span>Filters</span>
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden xl:block w-96 bg-menu-bg p-4 shadow-md h-fit">
        <h2 className="font-extrabold text-sm uppercase tracking-widest mb-4">FILTERS</h2>
        <div className="space-y-6">
          {filteredFilters.map((filter) => (
            <div key={filter.slug} className="space-y-2 border-b border-gray-300 pb-4">
              <h3 className="text-sm uppercase font-extrabold">{filter.title}</h3>
              <div className="space-y-1 grid md:grid-cols-2">
                {filter.items.slice(0, 12).map((option: string) => (
                  <label
                    key={option}
                    className="flex items-center space-x-2 px-2 py-1 text-sm cursor-pointer hover:bg-opacity-10 hover:bg-secondary rounded group"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={selectedFilters[filter.slug]?.includes(option) || false}
                        onChange={() => handleOptionSelect(filter.slug, option)}
                        className="peer sr-only"
                      />
                      <div className="h-4 w-4 border-2 border-foreground rounded-full transition-all duration-200 peer-checked:bg-foreground peer-checked:border-foreground group-hover:border-opacity-80" />
                    </div>
                    <span className="group-hover:text-opacity-80">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="xl:hidden fixed top-4 bottom-4 left-0 right-0 bg-menu-bg rounded-2xl shadow-lg z-50 flex flex-col"
            >
              {/* Fixed Header */}
              <div className="flex-none p-4 border-b border-gray-300">
                <div className="flex justify-between items-center">
                  <h2 className="font-extrabold text-sm uppercase tracking-widest">FILTERS</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-opacity-10 hover:bg-secondary rounded-full"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto">
                <div className="p-4 space-y-6">
                  {filters.map((filter) => (
                    <div key={filter.slug} className="space-y-2 border-b border-gray-300 pb-4">
                      <h3 className="text-sm uppercase font-extrabold">{filter.title}</h3>
                      <div className="space-y-1 grid grid-cols-2">
                        {filter.items.slice(0, 12).map((option: string) => (
                          <label
                            key={option}
                            className="flex items-center space-x-2 px-2 py-1 text-sm cursor-pointer hover:bg-opacity-10 hover:bg-secondary rounded group"
                          >
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={selectedFilters[filter.slug]?.includes(option) || false}
                                onChange={() => handleOptionSelect(filter.slug, option)}
                                className="peer sr-only"
                              />
                              <div className="h-4 w-4 border-2 border-foreground rounded-full transition-all duration-200 peer-checked:bg-foreground peer-checked:border-foreground group-hover:border-opacity-80" />
                            </div>
                            <span className="group-hover:text-opacity-80">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
