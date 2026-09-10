'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { CollegeItem, CollegesApiResponse } from './_types/recruiter-colleges.types';
import { VerifiedCollegesHero } from './_components/VerifiedCollegesHero';
import { VerifiedCollegesFilterBar } from './_components/VerifiedCollegesFilterBar';
import { VerifiedCollegesGrid } from './_components/VerifiedCollegesGrid';
import { RecruiterCollegesTable } from './_components/RecruiterCollegesTable';
import { VerifiedCollegesPagination } from './_components/VerifiedCollegesPagination';
import { RecruiterCollegeDossierModal } from './_components/RecruiterCollegeDossierModal';
import { 
  AlertCircle,
  RefreshCw,
  GraduationCap
} from 'lucide-react';

// Fallback top tier colleges dataset matching UI mockup
const MOCK_FALLBACK_COLLEGES: CollegeItem[] = [
  {
    id: 'col-1',
    name: 'IIT Bombay - Indian Institute of Technology',
    code: 'IITB',
    domain: 'iitb.ac.in',
    city: 'Mumbai',
    state: 'Maharashtra',
    logoUrl: null,
    isVerified: true,
    _count: { students: 15400, jobs: 42, tpos: 4, offers: 1280 }
  },
  {
    id: 'col-2',
    name: 'NIT Trichy - National Institute of Technology',
    code: 'NITT',
    domain: 'nitt.edu',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    logoUrl: null,
    isVerified: true,
    _count: { students: 18200, jobs: 36, tpos: 3, offers: 940 }
  },
  {
    id: 'col-3',
    name: 'BITS Pilani - Birla Institute of Technology and Science',
    code: 'BITS',
    domain: 'bits-pilani.ac.in',
    city: 'Pilani',
    state: 'Rajasthan',
    logoUrl: null,
    isVerified: true,
    _count: { students: 16800, jobs: 48, tpos: 5, offers: 1420 }
  },
  {
    id: 'col-4',
    name: 'VIT Vellore - Vellore Institute of Technology',
    code: 'VIT',
    domain: 'vit.ac.in',
    city: 'Vellore',
    state: 'Tamil Nadu',
    logoUrl: null,
    isVerified: true,
    _count: { students: 22400, jobs: 62, tpos: 6, offers: 2100 }
  },
  {
    id: 'col-5',
    name: 'SRM Institute of Science and Technology',
    code: 'SRM',
    domain: 'srmist.edu.in',
    city: 'Chennai',
    state: 'Tamil Nadu',
    logoUrl: null,
    isVerified: true,
    _count: { students: 25100, jobs: 54, tpos: 5, offers: 1890 }
  },
  {
    id: 'col-6',
    name: 'Manipal Institute of Technology (MIT Manipal)',
    code: 'MIT',
    domain: 'manipal.edu',
    city: 'Manipal',
    state: 'Karnataka',
    logoUrl: null,
    isVerified: true,
    _count: { students: 12900, jobs: 38, tpos: 4, offers: 1040 }
  },
  {
    id: 'col-7',
    name: 'IIT Delhi - Indian Institute of Technology',
    code: 'IITD',
    domain: 'iitd.ac.in',
    city: 'New Delhi',
    state: 'Delhi',
    logoUrl: null,
    isVerified: true,
    _count: { students: 14200, jobs: 51, tpos: 4, offers: 1350 }
  },
  {
    id: 'col-8',
    name: 'IIIT Hyderabad - International Institute of Information Technology',
    code: 'IIITH',
    domain: 'iiit.ac.in',
    city: 'Hyderabad',
    state: 'Telangana',
    logoUrl: null,
    isVerified: true,
    _count: { students: 8400, jobs: 44, tpos: 3, offers: 790 }
  },
];

export default function RecruiterCollegesPage() {
  const [colleges, setColleges] = useState<CollegeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Real Database Metrics & Fallback Stats State
  const [heroStats, setHeroStats] = useState<{
    totalVerified: number | string;
    totalStates: number | string;
    totalStudents: number | string;
  }>({
    totalVerified: 0,
    totalStates: 0,
    totalStudents: 0,
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filters & View State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [sortBy, setSortBy] = useState('name_asc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Selected College for Dossier Modal
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(null);
  const [selectedCollegeObj, setSelectedCollegeObj] = useState<CollegeItem | null>(null);

  // Fetch verified colleges from the API
  const fetchColleges = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<ApiResponse<CollegesApiResponse>>(
        `/api/colleges?isVerified=true&page=${page}&limit=${pageSize}`
      );
      if (response.data.success && response.data.data) {
        const fetched = response.data.data.colleges || [];
        const pagination = response.data.data.pagination;
        const apiStats = response.data.data.stats;

        if (fetched.length > 0) {
          // REAL DATABASE DATA FOUND -> Render ONLY real data!
          setColleges(fetched);
          setIsUsingFallback(false);
          if (pagination) {
            setTotalCount(pagination.total);
            setTotalPages(pagination.totalPages);
          }
          if (apiStats) {
            setHeroStats({
              totalVerified: apiStats.totalVerified,
              totalStates: apiStats.totalStates,
              totalStudents: apiStats.totalStudents,
            });
          } else {
            const distinctStates = new Set(fetched.map((c) => c.state).filter(Boolean)).size;
            const studentsSum = fetched.reduce((sum, c) => sum + (c._count?.students || 0), 0);
            setHeroStats({
              totalVerified: pagination?.total || fetched.length,
              totalStates: distinctStates || 1,
              totalStudents: studentsSum,
            });
          }
        } else {
          // NO DATA PRESENT IN DATABASE -> Fallback to mock demo data
          setColleges(MOCK_FALLBACK_COLLEGES);
          setIsUsingFallback(true);
          setTotalCount(MOCK_FALLBACK_COLLEGES.length);
          setTotalPages(Math.ceil(MOCK_FALLBACK_COLLEGES.length / pageSize));
          setHeroStats({
            totalVerified: 500,
            totalStates: 28,
            totalStudents: '1.2M+',
          });
        }
      } else {
        // Fallback on unexpected structure
        setColleges(MOCK_FALLBACK_COLLEGES);
        setIsUsingFallback(true);
        setTotalCount(MOCK_FALLBACK_COLLEGES.length);
        setTotalPages(Math.ceil(MOCK_FALLBACK_COLLEGES.length / pageSize));
        setHeroStats({
          totalVerified: 500,
          totalStates: 28,
          totalStudents: '1.2M+',
        });
      }
    } catch (err: any) {
      // Fallback on network/fetch failure
      setColleges(MOCK_FALLBACK_COLLEGES);
      setIsUsingFallback(true);
      setTotalCount(MOCK_FALLBACK_COLLEGES.length);
      setTotalPages(Math.ceil(MOCK_FALLBACK_COLLEGES.length / pageSize));
      setHeroStats({
        totalVerified: 500,
        totalStates: 28,
        totalStudents: '1.2M+',
      });
    } finally {
      setIsLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchColleges(currentPage);
  }, [fetchColleges, currentPage]);

  // Unique list of states
  const statesList = useMemo(() => {
    if (isUsingFallback) {
      const defaultStates = ['Maharashtra', 'Tamil Nadu', 'Rajasthan', 'Karnataka', 'Delhi', 'Telangana'];
      const currentStates = Array.from(new Set(colleges.map((c) => c.state).filter(Boolean))) as string[];
      return Array.from(new Set([...defaultStates, ...currentStates])).sort();
    }
    return Array.from(new Set(colleges.map((c) => c.state).filter(Boolean))).sort() as string[];
  }, [colleges, isUsingFallback]);

  // Unique list of locations
  const locationsList = useMemo(() => {
    if (isUsingFallback) {
      const defaultCities = ['Mumbai', 'Chennai', 'Pilani', 'Vellore', 'Manipal', 'New Delhi', 'Hyderabad'];
      const currentCities = Array.from(new Set(colleges.map((c) => c.city).filter(Boolean))) as string[];
      return Array.from(new Set([...defaultCities, ...currentCities])).sort();
    }
    return Array.from(new Set(colleges.map((c) => c.city).filter(Boolean))).sort() as string[];
  }, [colleges, isUsingFallback]);

  // Active filter tags
  const activeFilters = useMemo(() => {
    const tags: string[] = [];
    if (selectedState !== 'ALL') tags.push(`State: ${selectedState}`);
    if (selectedLocation !== 'ALL') tags.push(`City: ${selectedLocation}`);
    if (searchQuery.trim()) tags.push(`Search: "${searchQuery}"`);
    return tags;
  }, [selectedState, selectedLocation, searchQuery]);

  const handleRemoveFilter = (filter: string) => {
    if (filter.startsWith('State:')) setSelectedState('ALL');
    if (filter.startsWith('City:')) setSelectedLocation('ALL');
    if (filter.startsWith('Search:')) setSearchQuery('');
  };

  const handleClearAll = () => {
    setSelectedState('ALL');
    setSelectedLocation('ALL');
    setSearchQuery('');
  };

  // Filtered and Sorted Colleges List
  const processedColleges = useMemo(() => {
    let result = colleges.filter((college) => {
      if (selectedState !== 'ALL' && college.state !== selectedState) {
        return false;
      }
      if (selectedLocation !== 'ALL' && college.city !== selectedLocation) {
        return false;
      }
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase().trim();

      return (
        college.name.toLowerCase().includes(q) ||
        (college.code && college.code.toLowerCase().includes(q)) ||
        (college.city && college.city.toLowerCase().includes(q)) ||
        (college.state && college.state.toLowerCase().includes(q))
      );
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name_desc') return b.name.localeCompare(a.name);
      if (sortBy === 'students_desc') return (b._count?.students || 0) - (a._count?.students || 0);
      if (sortBy === 'drives_desc') return (b._count?.jobs || 0) - (a._count?.jobs || 0);
      return 0;
    });
  }, [colleges, selectedState, selectedLocation, searchQuery, sortBy]);

  const router = useRouter();

  const handleSelectCollege = (college: CollegeItem) => {
    router.push(`/recruiter/colleges/${college.id}`);
  };

  const handleCloseModal = () => {
    setSelectedCollegeId(null);
    setSelectedCollegeObj(null);
  };

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5 sm:space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Hero Banner with Real or Fallback Stats */}
      <VerifiedCollegesHero
        totalVerified={heroStats.totalVerified}
        totalStates={heroStats.totalStates}
        totalStudents={heroStats.totalStudents}
        isRealData={!isUsingFallback && colleges.length > 0}
      />

      {/* 2. Interactive Search, Filter Selectors & Sort Bar */}
      <VerifiedCollegesFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedState={selectedState}
        onStateChange={setSelectedState}
        statesList={statesList}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        locationsList={locationsList}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={totalCount}
        currentShowingCount={processedColleges.length}
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAll}
      />

      {/* 3. Main Data Content (Grid vs Table View) */}
      {isLoading && colleges.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 rounded-3xl bg-slate-200" />
          ))}
        </div>
      ) : viewMode === 'grid' ? (
        <VerifiedCollegesGrid
          colleges={processedColleges}
          onSelectCollege={handleSelectCollege}
        />
      ) : (
        <RecruiterCollegesTable
          colleges={processedColleges}
          onSelectCollege={handleSelectCollege}
          onResetFilters={handleClearAll}
        />
      )}

      {/* 4. Interactive Bottom Pagination */}
      <VerifiedCollegesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* 5. Detailed Institutional Inspection Dossier Modal */}
      <RecruiterCollegeDossierModal
        collegeId={selectedCollegeId}
        initialCollege={selectedCollegeObj}
        onClose={handleCloseModal}
      />

    </div>
  );
}
