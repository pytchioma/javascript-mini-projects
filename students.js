
// In-memory data store (seeded with the student already shown in the HTML)
let students = [
    { name: "Chioma", score: 80 }
];

// Passing threshold
const PASS_MARK = 50;

// Current UI state
let currentFilter = "all";   // "all" | "passed" | "failed"
let currentSearch = "";

const studentNameInput = document.getElementById("studentName");
const studentScoreInput = document.getElementById("studentScore");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const studentList = document.getElementById("studentList");
const totalStudentsEl = document.getElementById("totalStudents");
const averageScoreEl = document.getElementById("averageScore");
const highestScoreEl = document.getElementById("highestScore");

// The three filter buttons (All / Passed / Failed) sit in the div right after #searchInput's wrapper
const filterButtons = document.querySelectorAll(".flex.gap-4.mt-6.flex-wrap button");


// Event listeners

addBtn.addEventListener("click", addStudent);

studentScoreInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addStudent();
});
studentNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addStudent();
});

searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value.trim().toLowerCase();
    render();
});

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const label = btn.textContent.trim().toLowerCase();
        currentFilter = label; // "all" | "passed" | "failed"
        updateFilterButtonStyles();
        render();
    });
});


// Core functions

function addStudent() {
    const name = studentNameInput.value.trim();
    const score = parseFloat(studentScoreInput.value);

    if (!name) {
        alert("Please enter a student name.");
        return;
    }
    if (isNaN(score) || score < 0 || score > 100) {
        alert("Please enter a valid score between 0 and 100.");
        return;
    }

    students.push({ name, score });

    studentNameInput.value = "";
    studentScoreInput.value = "";
    studentNameInput.focus();

    render();
}

function deleteStudent(index) {
    students.splice(index, 1);
    render();
}


// Rendering

function render() {
    renderList();
    renderStats();
}

function renderList() {
    // Apply search + filter on top of the full students array,
    // but keep track of each item's true index for deletion.
    const filtered = students
        .map((s, index) => ({ ...s, index }))
        .filter((s) => s.name.toLowerCase().includes(currentSearch))
        .filter((s) => {
            if (currentFilter === "passed") return s.score >= PASS_MARK;
            if (currentFilter === "failed") return s.score < PASS_MARK;
            return true; // "all"
        });

    if (filtered.length === 0) {
        studentList.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                No students found.
            </div>
        `;
        return;
    }

    studentList.innerHTML = filtered
        .map((s) => {
            const statusColor = s.score >= PASS_MARK ? "text-green-400" : "text-red-400";
            const statusLabel = s.score >= PASS_MARK ? "Passed" : "Failed";

            return `
                <div class="bg-slate-900 p-5 rounded-xl flex justify-between items-center border border-slate-700">
                    <div>
                        <h3 class="font-semibold text-lg">${escapeHtml(s.name)}</h3>
                        <p class="text-gray-400">
                            Score: ${s.score}
                            <span class="ml-2 ${statusColor} font-medium">(${statusLabel})</span>
                        </p>
                    </div>
                    <button
                        class="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
                        onclick="deleteStudent(${s.index})">
                        Delete
                    </button>
                </div>
            `;
        })
        .join("");
}

function renderStats() {
    const total = students.length;
    totalStudentsEl.textContent = total;

    if (total === 0) {
        averageScoreEl.textContent = "0";
        highestScoreEl.textContent = "-";
        return;
    }

    const average = students.reduce((sum, s) => sum + s.score, 0) / total;
    averageScoreEl.textContent = average.toFixed(1);

    const topStudent = students.reduce((top, s) => (s.score > top.score ? s : top), students[0]);
    highestScoreEl.textContent = topStudent.name;
}

function updateFilterButtonStyles() {
    filterButtons.forEach((btn) => {
        const label = btn.textContent.trim().toLowerCase();
        btn.classList.remove("bg-blue-600", "bg-green-600", "bg-red-600");
        btn.classList.add("bg-slate-800");

        if (label === currentFilter) {
            btn.classList.remove("bg-slate-800");
            if (label === "all") btn.classList.add("bg-blue-600");
            if (label === "passed") btn.classList.add("bg-green-600");
            if (label === "failed") btn.classList.add("bg-red-600");
        }
    });
}

// Basic escaping to avoid HTML injection through the name field
function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}


// Initial render on page load

render();
updateFilterButtonStyles();