// toggle spinner
const toggleSpinner = (state) => {
  const spinner = document.getElementById("loading");
  if (state) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

// render cards in the UI
const renderCards = (items) => {
  const imageContainer = document.getElementById("all-img");
  imageContainer.innerHTML = "";
  document.getElementById("quntti").innerText = items.length;

  items.forEach((item) => {
    const updatedDate = new Date(item.updatedAt);
    const formattedDate = `${updatedDate.getDate().toString().padStart(2, "0")}/${(
      updatedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${updatedDate.getFullYear()}`;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div onclick="showIssueDetails(${item.id})" class="bg-white rounded-xl border border-gray-100 h-[300px] shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
        <div class="${item.status === "open" ? ` h-1.5 bg-green-500` : ` h-1.5 bg-[#A855F7]`} w-full"></div> 
        <div class="p-5">
            <div class="flex justify-between items-center mb-3">
                <div>
                  ${item.status === "open" ? ` <img src="../assets/Open-Status.png" alt="">` : ` <img src="../assets/Closed- Status .png" alt="">`}  
                </div>
                
                <span
  class="badge badge-sm font-bold px-3 py-2 uppercase text-[10px]
  ${
    item.priority === "high"
      ? "bg-red-100 text-red-500 border-red-100"
      : item.priority === "medium"
        ? "bg-yellow-100 text-yellow-500 border-yellow-100"
        : "bg-green-100 text-green-500 border-green-100"
  }"
>
  ${item.priority}
</span>
            </div>

            <h3 class="font-bold text-slate-800 text-sm mb-2 leading-tight">
                ${item.title}
            </h3>
            <p class="text-xs text-slate-400 mb-4 line-clamp-2">
                ${item.description}
            </p>

            <div class="flex flex-wrap gap-2 mb-6">
           ${item.labels
             .map((tag, index) => {
               if (index === 0) {
                 return `
          <span class="badge badge-outline bg-[#FECACA] border-red-200 text-red-400 text-[10px] font-bold px-2 py-1 uppercase"> <i class="fa-solid fa-bug"></i>
            ${tag}
          </span>
        `;
               } else {
                 return `
          <span class="badge badge-outline bg-[#FFF8DB] border-red-200 text-[#D97706] text-[10px] font-bold px-2 py-1 uppercase"><i class="fa-solid fa-life-ring"></i>
            ${tag}
          </span>
        `;
               }
             })
             .join("")}
  </div>

            <div class="pt-4 border-t border-gray-200 flex flex-col gap-1">
                <p class="text-[11px] text-slate-400 font-medium">#${item.id} by ${item.author}</p>
                <p class="text-[11px] text-slate-400">${formattedDate}</p>
            </div>
        </div>
      </div>
    `;
    imageContainer.append(wrapper);
  });

  toggleSpinner(false);
};
// button active state
const buttonAll = document.getElementById("btn-all");
const buttonOpen = document.getElementById("btn-open");
const buttonClosed = document.getElementById("btn-closed");
const btnList = [buttonAll, buttonOpen, buttonClosed];
// active state
btnList.forEach((element) => {
  element.addEventListener("click", () => {
    btnList.forEach((b) => b.classList.remove("bg-[#6322FF]", "text-white"));
    element.classList.add("bg-[#6322FF]", "text-white");
  });
});

let issueStore = [];

//
const loadAllIssues = async () => {
  toggleSpinner(true);
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const result = await response.json();
  issueStore = result.data;
  renderCards(issueStore);
};

document.getElementById("btn-open").addEventListener("click", () => {
  toggleSpinner(true);
  const openList = issueStore.filter((item) => item.status === "open");
  renderCards(openList);
});

document.getElementById("btn-closed").addEventListener("click", () => {
  toggleSpinner(true);
  const closedList = issueStore.filter((item) => item.status === "closed");
  renderCards(closedList);
});

document.getElementById("btn-all").addEventListener("click", () => {
  toggleSpinner(true);
  renderCards(issueStore);
});
// show details in the modal
const showIssueDetails = async (issueId) => {
  const api = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`;

  const response = await fetch(api);
  const info = await response.json();

  renderDetails(info.data);

  document.getElementById("word_modal").showModal();
};
// render details in the modal
const renderDetails = (info) => {
  const detailBox = document.getElementById("detils-continer");

  const updatedDate = new Date(info.updatedAt);
  const formattedDate = `${updatedDate.getDate().toString().padStart(2, "0")}/${(
    updatedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${updatedDate.getFullYear()}`;

  detailBox.innerHTML = `
  
 <div class="p-6">
      <h2 class="text-2xl font-bold text-slate-800">${info.title}</h2>
      <div class="flex gap-2 mt-2 items-center">
  <span class="px-3 py-1 font-bold rounded-full text-white ${info.status === "open" ? "bg-green-500" : "bg-purple-500"}">
    ${info.status === "open" ? "Opened" : "Closed"}
  </span>

  <p class="text-sm text-slate-500">
    • ${info.status === "open" ? "opened" : "closed"} by ${info.author} • ${formattedDate}
  </p>
</div>
      
          <div class="flex flex-wrap gap-2  mt-4">
          ${info.labels
            .map((tag, index) => {
              if (index === 0) {
                return `
        <span class="badge badge-outline bg-[#FECACA] border-red-200 text-red-400 text-[10px] font-bold px-2 py-1 uppercase">
          <i class="fa-solid fa-bug"></i> ${tag}
        </span>
      `;
              } else {
                return `
        <span class="badge badge-outline bg-[#FFF8DB] border-red-200 text-[#D97706] text-[10px] font-bold px-2 py-1 uppercase">
          <i class="fa-solid fa-life-ring"></i> ${tag}
        </span>
      `;
              }
            })
            .join("")}
  </div>
    </div>

    <div class="px-6 pb-6">
      <p class="text-slate-600 leading-relaxed">
        ${info.description}
      </p>
    </div>

    <div class="bg-slate-50 p-6 flex justify-between items-center">
      <div>
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assignee:</p>
        <p class="font-bold text-slate-800">${info.author}</p>
      </div>
      <div class="text-right">
        <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Priority:</p>
        <span class="px-4 py-1 bg-red-500 text-white text-xs font-bold rounded-full">${info.priority}</span>
      </div>
    </div>

  `;
};
// search issue by keyword
const findIssue = async (keyword) => {
  toggleSpinner(true);

  const response = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${keyword}`,
  );

  const result = await response.json();

  renderCards(result.data);
};
// search by enter key
document.getElementById("input-search").addEventListener("keyup", (event) => {
  const text = event.target.value;

  if (text === "") {
    renderCards(issueStore);
  } else {
    findIssue(text);
  }
});

loadAllIssues();
