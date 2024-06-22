import React, { useEffect, useState } from 'react';
import Card from '../component/Card';
import Add from '../component/Add';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNote } from '../redux/noteSlice';
import './Home.css';

function Home() {
    const dispatch = useDispatch();
    const { notes, loading } = useSelector(state => state?.note);

    useEffect(() => {
        dispatch(fetchNote());
    }, [dispatch]);

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [notesPerPage] = useState(4); // You can change the number of notes per page here
    const [showImportantOnly, setShowImportantOnly] = useState(false);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleFilterImportant = () => {
        setShowImportantOnly(!showImportantOnly);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const filteredNotes = notes.filter(note => {
        const matchesSearchQuery = note.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesImportantFilter = showImportantOnly ? note.important : true;
        return matchesSearchQuery && matchesImportantFilter;
    });

    // Get current notes based on pagination
    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

    return (
        <div className='min-vh-100'>
            <div className='my-3 text-center'>
                <Add />
            </div>
            <div className='my-3 text-center'>
                <div>
                    <input
                        placeholder="Search your notes"
                        onChange={handleSearch}
                        value={searchQuery}
                        className="input"
                        name="text"
                        type="text"
                    />
                </div>
            </div>
            <div className='my-3 text-center'>
                <button onClick={handleFilterImportant} className="filter-button">
                    {showImportantOnly ? (
                        <>
                            All Notes
                        </>
                    ) : 
                    (
                        <>
                            <i className="fa-solid fa-bookmark" style={{ color: "gold" }}></i> Important Notes
                        </>
                    )}
                </button>
            </div>
            <div className='d-flex justify-content-evenly align-item-center flex-wrap gap-3 mt-4'>
                {loading ? (
                    <div className='mt-5'>
                        <div className="spinner">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                ) : (
                    currentNotes.length > 0 ? (
                        currentNotes.map(note => (
                            <Card key={note.id} data={note} />
                        ))
                    ) : (
                        <div className='mt-5'>
                            <div className="spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    )
                )}
            </div>
            {/* Pagination Controls */}
            <div className='pagination'>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Home;
