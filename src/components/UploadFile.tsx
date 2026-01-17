import { useState, useRef } from "react";
import type {
  ChangeEvent,
  DragEvent,
  MouseEvent,
} from "react";
import DeleteIcon from "./icons/DeleteIcon";

export default function FileUpload() {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [file, setFile] = useState<File | null>(null);

	const openFileDialog = () => inputRef.current?.click();

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	const handleFileDelete = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setFile(null)
    if (inputRef.current) {
      inputRef.current.value = '';
    }
	}

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
	  e.preventDefault();
	  const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
	}

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
	  e.preventDefault();
	};

	return (
		<div>
			<span className='block mb-2 font-medium'>Photo</span>

			<div
				className='w-full min-h-29 flex flex-col items-center justify-center bg-white border border-lavander-100 rounded-lg text-center p-4'
				onDrop={handleDrop}
				onDragOver={handleDragOver}
			>

				{file ? (
					<div className='flex'>
						<p> {file.name}</p>
						<button
							type='button'
							onClick={handleFileDelete}
							className='cursor-pointer -translate-y-1'
							aria-label='Delete'
						>
							<DeleteIcon />
						</button>
					</div>
				) : (
					<p className='text-textGrey'>
						<span className='text-active-100 underline cursor-pointer' onClick={openFileDialog}>Upload a file</span> or drag and drop here
					</p>
				)}

				<input
					ref={inputRef}
					type='file'
					className='hidden'
					onChange={handleFileChange}
				/>
			</div>
		</div>
	);
}
