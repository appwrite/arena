import type { ReactNode } from "react";

const KEYWORDS = new Set([
	"import",
	"from",
	"const",
	"await",
	"new",
	"let",
	"var",
	"return",
	"export",
	"default",
	"function",
]);

function highlightCode(code: string): ReactNode[] {
	const lines = code.split("\n");
	return lines.map((line, li) => {
		const nodes: ReactNode[] = [];
		let i = 0;

		while (i < line.length) {
			// Comments
			if (line[i] === "/" && line[i + 1] === "/") {
				nodes.push(
					<span key={`${li}-${i}`} className="text-[#97979B]">
						{line.slice(i)}
					</span>,
				);
				i = line.length;
				continue;
			}

			// Strings
			if (line[i] === "'" || line[i] === '"' || line[i] === "`") {
				const quote = line[i];
				let end = i + 1;
				while (end < line.length && line[end] !== quote) end++;
				end++;
				nodes.push(
					<span key={`${li}-${i}`} className="text-[#4E7E7C]">
						{line.slice(i, end)}
					</span>,
				);
				i = end;
				continue;
			}

			// Words (keywords, identifiers)
			if (/[a-zA-Z_$]/.test(line[i])) {
				let end = i;
				while (end < line.length && /[a-zA-Z0-9_$]/.test(line[end])) end++;
				const word = line.slice(i, end);
				if (KEYWORDS.has(word)) {
					nodes.push(
						<span key={`${li}-${i}`} className="text-[#982042]">
							{word}
						</span>,
					);
				} else {
					nodes.push(
						<span key={`${li}-${i}`} className="text-[#56565C]">
							{word}
						</span>,
					);
				}
				i = end;
				continue;
			}

			// Everything else (punctuation, whitespace)
			nodes.push(
				<span key={`${li}-${i}`} className="text-[#56565C]">
					{line[i]}
				</span>,
			);
			i++;
		}

		return (
			// biome-ignore lint/suspicious/noArrayIndexKey: lines are static and never reordered
			<span key={li}>
				{nodes}
				{li < lines.length - 1 ? "\n" : null}
			</span>
		);
	});
}

const PANELS: {
	label: string;
	question: string;
	answer: string;
	code: string;
	success?: string;
	errors?: string[];
}[] = [
	{
		label: "Without Skills.md",
		question: "How do I create a document?",
		answer:
			"Sure, here's an example code how you can create a document in Appwrite Databases:",
		code: `import Appwrite from 'appwrite';

const appwrite = new Appwrite();
appwrite.setEndpoint('https://cloud.appwrite.io/v1');

// Removed in Appwrite 1.0
await appwrite.database.createDocument(
  'collectionId', { title: 'Hello' }
);`,
		errors: [
			"Cannot read properties of undefined 'createDocument'",
			'Param "databaseId" is not optional.',
			"Project is not accessible in this region.",
		],
	},
	{
		label: "With Skills.md",
		question: "How do I create a document?",
		answer:
			"Great question! Here's how to create a row - newer replacement of a document, using the Appwrite's web SDK:",
		code: `import { Client, TablesDB, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://<REGION>.cloud.appwrite.io/v1')
  .setProject('<PROJECT_ID>');

const tables = new TablesDB(client);
await tables.createRow({
  databaseId: '<DATABASE_ID>',
  tableId: '<TABLE_ID>',
  documentId: ID.unique(),
  data: { title: 'Hello', content: 'World' }
});`,
		success: "✓ built in 743ms",
	},
];

export default function TwoModes() {
	return (
		<section
			data-theme="light"
			className="rise-in bg-[#EDEDF0] px-4 pt-24 pb-14 xl:pt-32 xl:pb-20"
		>
			<div className="arena-container">
				<div className="grid grid-cols-1 items-center gap-10 xl:gap-20 xl:grid-cols-3">
					{/* Left — text */}
					<div>
						<span className="mb-4 inline-block rounded-full border border-[#19191C]/10 bg-[#19191C]/5 px-3 py-1 text-xs font-medium text-[#19191C]">
							Evaluation modes
						</span>
						<h2 className="mb-4 font-heading text-3xl font-normal tracking-[-2%] text-[#19191C] xl:text-4xl">
							Context changes everything
						</h2>
						<p className="max-w-md text-base font-medium leading-relaxed tracking-[-1.4%] text-[#56565C]">
							We test each model with and without Appwrite&apos;s docs. The gap
							reveals how well it leverages context.
						</p>
					</div>

					{/* Right — two panels side by side */}
					<div className="flex flex-col overflow-hidden border border-[#19191C]/12 bg-white min-[840px]:flex-row xl:col-span-2">
						{PANELS.map((panel, i) => (
							<div
								key={panel.label}
								className={`flex-1 ${i === 0 ? "border-b min-[840px]:border-b-0 min-[840px]:border-r border-[#19191C]/12" : ""}`}
							>
								<div className="border-b border-[#19191C]/8 bg-[#F5F5F7] px-4 py-2.5 text-xs font-medium text-[#19191C]">
									{panel.label}
								</div>
								<div className="flex flex-col gap-3 p-4">
									<div className="rounded-lg rounded-tl-sm border border-[#19191C]/5 bg-[#F5F5F7] px-3 py-1.5">
										<p className="text-[12px] leading-relaxed text-[#19191C]">
											{panel.question}
										</p>
									</div>
									<div className="flex flex-col gap-2">
										<p className="text-[12px] leading-relaxed text-[#56565C]">
											{panel.answer}
										</p>
										<pre className="overflow-x-auto rounded-lg border border-[#19191C]/8 bg-[#FAFAFA] p-2.5 font-mono text-[10px] leading-relaxed">
											<code>{highlightCode(panel.code)}</code>
										</pre>
										{panel.success && (
											<div className="flex items-center gap-1.5 rounded-md border border-green-200 bg-green-50 px-2 py-1.5 font-mono text-[10px] leading-tight text-green-600">
												<span>{panel.success}</span>
											</div>
										)}
										{panel.errors && (
											<div className="flex flex-col gap-1.5">
												{panel.errors.map((error) => (
													<div
														key={error}
														className="flex items-start gap-1.5 rounded-md border border-red-200 bg-red-50 px-2 py-1.5 font-mono text-[10px] leading-tight text-red-600"
													>
														<span className="mt-px shrink-0">&#x2716;</span>
														<span>{error}</span>
													</div>
												))}
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
