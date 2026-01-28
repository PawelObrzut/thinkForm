import { useRef, useState } from "react";
import type {
  ChangeEvent,
  DragEvent,
  MouseEvent,
} from "react";
import DeleteIcon from "./icons/DeleteIcon";

type Props = {
	file: File | null;
	onChange: (file: File | null) => void;
}


const FileUpload = ({file, onChange}: Props) => {
	const [isHovered, setIsHovered] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	
	const openFileDialog = () => inputRef.current?.click();
	
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			onChange(e.target.files[0]);
		}
	};
	
	const handleFileDelete = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		onChange(null);
    if (inputRef.current) {
			inputRef.current.value = '';
    }
	}
	
	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	  const files = e.dataTransfer.files;

    if (files && files.length > 0) {
			const file = files[0];
			const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

			if (!allowedTypes.includes(file.type)) return;
      onChange(file);
			setIsHovered(false);
    }
	}

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
	  e.preventDefault();
		setIsHovered(true)
	};

	return (
		<div>
			<span className='block mb-2 font-medium'>Photo</span>

			<div
				className={`
					w-full min-h-29 flex flex-col items-center justify-center bg-white border rounded-lg text-center p-4
					${isHovered ? 'border-active-100' : 'border-lavander-100'}
					`}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onDragLeave={() => setIsHovered(false)}
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
					accept='.png,.jpg,.jpeg'
					onChange={handleFileChange}
				/>
			</div>
		</div>
	);
}

export default FileUpload