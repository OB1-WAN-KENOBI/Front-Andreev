import { useState, useCallback, lazy, Suspense } from "react";
import { Post } from "./types";
import Header from "./components/Header/Header";
import Navigation from "./components/Header/Navigation";
import MobileMenu from "./components/Header/MobileMenu";
import PostGrid from "./components/PostGrid/PostGrid";
import LoadingSkeleton from "./components/common/LoadingSkeleton";
import SearchBar from "./components/SearchBar/SearchBar";
import usePosts from "./hooks/usePosts";
import useSearch from "./hooks/useSearch";
import "./App.css";

// Lazy loading для Modal
const Modal = lazy(() => import("./components/Modal/Modal"));

function App() {
  const { posts, loading, error } = usePosts();
  const { searchQuery, setSearchQuery, filteredPosts } = useSearch(posts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handlePostClick = useCallback((post: Post) => {
    setSelectedPost(post);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPost(null);
  }, []);

  const handleOpenMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleOpenSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  return (
    <div className="app">
      <Header
        onSearchClick={handleOpenSearch}
        onMenuClick={handleOpenMobileMenu}
      />
      <Navigation />

      <main className="main-content">
        {loading && <LoadingSkeleton />}

        {error && (
          <div className="error-state">
            <p>Ошибка при загрузке постов: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <PostGrid posts={filteredPosts} onPostClick={handlePostClick} />
        )}
      </main>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu} />

      {isSearchOpen && (
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClose={handleCloseSearch}
        />
      )}

      {selectedPost && (
        <Suspense fallback={null}>
          <Modal post={selectedPost} onClose={handleCloseModal} />
        </Suspense>
      )}
    </div>
  );
}

export default App;
