"use client";
import React from "react";
import { Button, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface PaginationProps {
  page: number; 
  size: number; 
  totalItems: number; 
  onPageChange: (newPage: number) => void; 
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  size,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / size);

  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  if (totalPages <= 1) return null; 

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <IconButton
        color="primary"
        onClick={handlePrevious}
        disabled={page === 1}
      >
        <ChevronLeftIcon />
      </IconButton>

      <span className="text-sm text-gray-700">
        Página <strong>{page}</strong> de {totalPages}
      </span>

      <IconButton
        color="primary"
        onClick={handleNext}
        disabled={page === totalPages}
      >
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
};

export default Pagination;
