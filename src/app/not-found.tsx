import Link from 'next/link';

const NotFound = () => (
	<div className="flex min-h-100 flex-col items-center justify-center">
		<h1 className="mb-4 text-4xl font-bold text-red-600">404</h1>
		<h2 className="mb-6 text-2xl">Page Not Found</h2>
		<p className="mb-8 text-gray-600">
			The page you are looking for does not exist.
		</p>
		<Link href="/">
			<button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
				Go to Homepage
			</button>
		</Link>
	</div>
);

export default NotFound;
