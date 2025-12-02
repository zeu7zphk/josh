// Content Script completo - Tudo em um arquivo
;(() => {
  // ============================================
  // ESTILOS CSS INLINE
  // ============================================
  const popupStyles = `
    .shopee-liveboard-popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    .shopee-liveboard-popup-container {
      background: #f5f5f5;
      width: 500px;
      max-width: 90vw;
      max-height: 90vh;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      position: relative;
      overflow-y: auto;
      animation: popupFadeIn 0.3s ease-out;
    }

    @keyframes popupFadeIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .shopee-liveboard-popup-close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 30px;
      height: 30px;
      border: none;
      background: #ee4d2d;
      color: white;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      transition: background 0.2s;
    }

    .shopee-liveboard-popup-close:hover {
      background: #d63c1f;
    }

    .shopee-liveboard-popup-content {
      padding: 20px;
    }

    .shopee-liveboard-popup-content h1 {
      font-size: 20px;
      color: #333;
      margin-bottom: 20px;
      text-align: center;
      margin-top: 0;
    }

    .shopee-liveboard-popup-content h2,
    .shopee-liveboard-popup-content h3 {
      font-size: 16px;
      color: #333;
      margin-bottom: 15px;
      margin-top: 15px;
    }

    .shopee-liveboard-values-section {
      background: white;
      padding: 15px;
      margin-bottom: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .shopee-liveboard-values-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 15px;
    }

    .shopee-liveboard-value-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .shopee-liveboard-value-item label {
      font-size: 12px;
      color: #666;
      font-weight: 500;
    }

    .shopee-liveboard-value-input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 12px;
    }

    .shopee-liveboard-value-input:focus {
      outline: none;
      border-color: #ee4d2d;
    }

    .shopee-liveboard-settings-section {
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .shopee-liveboard-switch-container {
      background: #fafafa;
      padding: 12px;
      margin-bottom: 12px;
      border-radius: 6px;
      border-left: 3px solid #ee4d2d;
    }

    .shopee-liveboard-switch-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      margin-bottom: 8px;
    }

    .shopee-liveboard-switch-text {
      font-weight: 500;
      color: #333;
      font-size: 14px;
    }

    .shopee-liveboard-switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 24px;
    }

    .shopee-liveboard-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .shopee-liveboard-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 24px;
    }

    .shopee-liveboard-slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }

    .shopee-liveboard-switch input:checked + .shopee-liveboard-slider {
      background-color: #ee4d2d;
    }

    .shopee-liveboard-switch input:checked + .shopee-liveboard-slider:before {
      transform: translateX(26px);
    }

    .shopee-liveboard-switch-description {
      font-size: 11px;
      color: #999;
      margin: 5px 0 0 0;
    }

    .shopee-liveboard-product-editor {
      background: #f9f9f9;
      padding: 12px;
      margin-top: 15px;
      border-radius: 6px;
      border: 1px solid #eeeeee;
    }

    .shopee-liveboard-product-editor h3 {
      font-size: 14px;
      color: #333;
      margin: 0 0 12px 0;
    }

    .shopee-liveboard-product-item {
      border: 1px solid #ddd;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      background: #fafafa;
    }

    .shopee-liveboard-product-item label {
      display: block;
      font-size: 11px;
      color: #666;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .shopee-liveboard-product-item input {
      width: 100%;
      padding: 6px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 11px;
      margin-bottom: 8px;
    }

    .shopee-liveboard-product-item input:focus {
      outline: none;
      border-color: #ee4d2d;
    }

    .shopee-liveboard-save-btn,
    .shopee-liveboard-capture-btn {
      width: 100%;
      padding: 10px;
      background: #ee4d2d;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      margin-bottom: 8px;
      transition: background 0.3s;
    }

    .shopee-liveboard-capture-btn {
      background: #0066cc;
    }

    .shopee-liveboard-capture-btn:hover {
      background: #0052a3;
    }

    .shopee-liveboard-save-btn:hover {
      background: #d63c1f;
    }

    .shopee-liveboard-capture-btn:active,
    .shopee-liveboard-save-btn:active {
      transform: scale(0.98);
    }
  `

  // ============================================
  // MÓDULO DE CONFIGURAÇÕES
  // ============================================
  const ConfigManager = {
    replaceChartEnabled: false,
    replaceRankingEnabled: false,
    products: [],
    liveboardValues: {
      visitantes: "",
      cliquesporproduto: "",
      pedidos: "",
      unidades: "",
      totaldecompradores: "",
      taxadeconversao: "",
      vendastotais: "",
    },

    async load() {
      const settings = await window.chrome.storage.local.get([
        "replaceChart",
        "replaceRanking",
        "products",
        "liveboardValues",
      ])
      this.replaceChartEnabled = settings.replaceChart || false
      this.replaceRankingEnabled = settings.replaceRanking || false
      this.products = settings.products || []
      this.liveboardValues = settings.liveboardValues || this.liveboardValues
    },
  }

  // ============================================
  // MÓDULO DE POPUP DE CONFIGURAÇÕES
  // ============================================
  const PopupManager = {
    popupElement: null,
    isOpen: false,

    init() {
      // Injetar estilos
      this.injectStyles()
      // Inicializar detector de 3 cliques
      this.initTripleClick()
    },

    injectStyles() {
      if (document.getElementById("shopee-liveboard-popup-styles")) {
        return
      }

      const style = document.createElement("style")
      style.id = "shopee-liveboard-popup-styles"
      style.textContent = popupStyles
      document.head.appendChild(style)
    },

    initTripleClick() {
      let clickCount = 0
      let clickTimer = null

      document.addEventListener("click", (e) => {
        clickCount++

        if (clickTimer) {
          clearTimeout(clickTimer)
        }

        clickTimer = setTimeout(() => {
          if (clickCount === 3) {
            this.toggle()
          }
          clickCount = 0
        }, 500) // 500ms para os 3 cliques
      })
    },

    async toggle() {
      if (this.isOpen) {
        this.close()
      } else {
        await this.open()
      }
    },

    async open() {
      if (this.isOpen) return

      await ConfigManager.load()

      // Criar overlay
      const overlay = document.createElement("div")
      overlay.className = "shopee-liveboard-popup-overlay"
      overlay.id = "shopee-liveboard-popup-overlay"

      // Criar container
      const container = document.createElement("div")
      container.className = "shopee-liveboard-popup-container"

      // Botão fechar
      const closeBtn = document.createElement("button")
      closeBtn.className = "shopee-liveboard-popup-close"
      closeBtn.innerHTML = "×"
      closeBtn.onclick = () => this.close()

      // Conteúdo
      const content = document.createElement("div")
      content.className = "shopee-liveboard-popup-content"
      content.innerHTML = this.generatePopupHTML()

      container.appendChild(closeBtn)
      container.appendChild(content)
      overlay.appendChild(container)

      // Fechar ao clicar no overlay (fora do container)
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          this.close()
        }
      })

      document.body.appendChild(overlay)
      this.popupElement = overlay
      this.isOpen = true

      // Inicializar eventos do popup
      this.initPopupEvents()
    },

    generatePopupHTML() {
      const liveboardValues = ConfigManager.liveboardValues
      const valueLabels = {
        visitantes: "Visitantes",
        cliquesporproduto: "Cliques Por Produto",
        pedidos: "Pedidos",
        unidades: "Unidades",
        totaldecompradores: "Total de Compradores",
        taxadeconversao: "Taxa de Conversão (%)",
        vendastotais: "Vendas Totais (R$)",
      }

      let valuesHTML = ""
      Object.keys(valueLabels).forEach((key) => {
        valuesHTML += `
          <div class="shopee-liveboard-value-item">
            <label>${valueLabels[key]}</label>
            <input type="text" class="shopee-liveboard-value-input" data-key="${key}" value="${liveboardValues[key] || ""}">
          </div>
        `
      })

      const productEditorDisplay = ConfigManager.replaceRankingEnabled ? "block" : "none"
      let productsHTML = ""

      const productsToRender = ConfigManager.products.length === 5 ? ConfigManager.products : [
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgjeF8MpRDau89BqT_rUbx4YTPmJKuVUKsQ&s",
          name: "Canela  500g em Pó Natural 100% Pura 500g",
          price: "38,00",
        },
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgjeF8MpRDau89BqT_rUbx4YTPmJKuVUKsQ&s",
          name: "Canela  500g em Pó Natural 100% Pura 500g",
          price: "38,00",
        },
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgjeF8MpRDau89BqT_rUbx4YTPmJKuVUKsQ&s",
          name: "Canela  500g em Pó Natural 100% Pura 500g",
          price: "38,00",
        },
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgjeF8MpRDau89BqT_rUbx4YTPmJKuVUKsQ&s",
          name: "Canela  500g em Pó Natural 100% Pura 500g",
          price: "38,00",
        },
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgjeF8MpRDau89BqT_rUbx4YTPmJKuVUKsQ&s",
          name: "Canela  500g em Pó Natural 100% Pura 500g",
          price: "38,00",
        },
      ]

      productsToRender.forEach((product, index) => {
        productsHTML += `
          <div class="shopee-liveboard-product-item">
            <label>Produto ${index + 1}</label>
            <label>URL da Imagem:</label>
            <input type="text" class="shopee-liveboard-product-image" data-index="${index}" value="${product.image || ""}" placeholder="URL da imagem">
            <label>Nome do Produto:</label>
            <input type="text" class="shopee-liveboard-product-name" data-index="${index}" value="${product.name || ""}" placeholder="Nome do produto">
            <label>Preço:</label>
            <input type="text" class="shopee-liveboard-product-price" data-index="${index}" value="${product.price || ""}" placeholder="38,00">
          </div>
        `
      })

      return `
        <h1>Configurações</h1>
        
        <div class="shopee-liveboard-values-section">
          <h2>Valores do Liveboard</h2>
          <div class="shopee-liveboard-values-container">
            ${valuesHTML}
          </div>
          <button id="shopee-liveboard-saveValuesBtn" class="shopee-liveboard-save-btn">Salvar Valores</button>
          <button id="shopee-liveboard-captureValuesBtn" class="shopee-liveboard-capture-btn">Capturar Valores da Página</button>
        </div>

        <div class="shopee-liveboard-settings-section">
          <h3>Substituições</h3>
          
          <div class="shopee-liveboard-switch-container">
            <label class="shopee-liveboard-switch-label">
              <span class="shopee-liveboard-switch-text">Substituir Gráfico</span>
              <label class="shopee-liveboard-switch">
                <input type="checkbox" id="shopee-liveboard-replaceChart" ${ConfigManager.replaceChartEnabled ? "checked" : ""}>
                <span class="shopee-liveboard-slider"></span>
              </label>
            </label>
            <p class="shopee-liveboard-switch-description">Substitui o gráfico por um iframe personalizado</p>
          </div>

          <div class="shopee-liveboard-switch-container">
            <label class="shopee-liveboard-switch-label">
              <span class="shopee-liveboard-switch-text">Substituir Ranking de Produtos</span>
              <label class="shopee-liveboard-switch">
                <input type="checkbox" id="shopee-liveboard-replaceRanking" ${ConfigManager.replaceRankingEnabled ? "checked" : ""}>
                <span class="shopee-liveboard-slider"></span>
              </label>
            </label>
            <p class="shopee-liveboard-switch-description">Substitui o ranking de produtos por conteúdo editável</p>
          </div>

          <div id="shopee-liveboard-productEditor" class="shopee-liveboard-product-editor" style="display: ${productEditorDisplay};">
            <h3>Editar Produtos</h3>
            <div id="shopee-liveboard-productsList">
              ${productsHTML}
            </div>
            <button id="shopee-liveboard-saveProducts" class="shopee-liveboard-save-btn">Salvar Produtos</button>
          </div>
        </div>
      `
    },

    initPopupEvents() {
      const replaceChartSwitch = document.getElementById("shopee-liveboard-replaceChart")
      const replaceRankingSwitch = document.getElementById("shopee-liveboard-replaceRanking")
      const productEditor = document.getElementById("shopee-liveboard-productEditor")
      const saveProductsBtn = document.getElementById("shopee-liveboard-saveProducts")
      const saveValuesBtn = document.getElementById("shopee-liveboard-saveValuesBtn")
      const captureValuesBtn = document.getElementById("shopee-liveboard-captureValuesBtn")

      // Switch do gráfico
      replaceChartSwitch.addEventListener("change", async (e) => {
        ConfigManager.replaceChartEnabled = e.target.checked
        await window.chrome.storage.local.set({ replaceChart: e.target.checked })

        if (e.target.checked) {
          ChartReplacer.start()
        } else {
          ChartReplacer.stop()
        }
      })

      // Switch do ranking
      replaceRankingSwitch.addEventListener("change", async (e) => {
        ConfigManager.replaceRankingEnabled = e.target.checked
        await window.chrome.storage.local.set({ replaceRanking: e.target.checked })

        if (e.target.checked) {
          productEditor.style.display = "block"
          RankingReplacer.start()
        } else {
          productEditor.style.display = "none"
          RankingReplacer.stop()
        }
      })

      // Capturar valores
      captureValuesBtn.addEventListener("click", () => {
        const values = LiveboardCapture.captureAllValues()
        
        // Atualizar inputs
        document.querySelectorAll(".shopee-liveboard-value-input").forEach((input) => {
          const key = input.dataset.key
          if (values[key]) {
            input.value = values[key]
          }
        })
      })

      // Salvar valores
      saveValuesBtn.addEventListener("click", async () => {
        const inputs = document.querySelectorAll(".shopee-liveboard-value-input")
        const liveboardValues = { ...ConfigManager.liveboardValues }

        inputs.forEach((input) => {
          liveboardValues[input.dataset.key] = input.value
        })

        await window.chrome.storage.local.set({ liveboardValues })
        ConfigManager.liveboardValues = liveboardValues

        LiveboardCapture.updatePageValues(liveboardValues)
        LiveboardCapture.stopMonitoring()
        LiveboardCapture.startMonitoring()

        // Feedback visual
        saveValuesBtn.textContent = "Salvo!"
        saveValuesBtn.style.background = "#4caf50"
        setTimeout(() => {
          saveValuesBtn.textContent = "Salvar Valores"
          saveValuesBtn.style.background = "#ee4d2d"
        }, 1500)
      })

      // Salvar produtos
      saveProductsBtn.addEventListener("click", async () => {
        const products = []
        const productItems = document.querySelectorAll(".shopee-liveboard-product-item")

        productItems.forEach((item) => {
          const image = item.querySelector(".shopee-liveboard-product-image").value
          const name = item.querySelector(".shopee-liveboard-product-name").value
          const price = item.querySelector(".shopee-liveboard-product-price").value

          products.push({
            image: image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgjeF8MpRDau89BqT_rUbx4YTPmJKuVUKsQ&s",
            name: name || "Produto",
            price: price || "0,00",
          })
        })

        await window.chrome.storage.local.set({ products })
        ConfigManager.products = products

        if (ConfigManager.replaceRankingEnabled) {
          RankingReplacer.replaced = false
          setTimeout(() => RankingReplacer.replace(), 100)
        }

        // Feedback visual
        saveProductsBtn.textContent = "Salvo!"
        saveProductsBtn.style.background = "#4caf50"
        setTimeout(() => {
          saveProductsBtn.textContent = "Salvar Produtos"
          saveProductsBtn.style.background = "#ee4d2d"
        }, 1500)
      })
    },

    close() {
      if (this.popupElement) {
        this.popupElement.remove()
        this.popupElement = null
        this.isOpen = false
      }
    },
  }

  // ============================================
  // MÓDULO DE CAPTURA DE VALORES DO LIVEBOARD
  // ============================================
  const LiveboardCapture = {
    valueObserver: null,
    monitoring: false,

    init() {
      // Listener para requisições do popup (mantido para compatibilidade)
      window.chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "captureValues") {
          const values = this.captureAllValues()
          sendResponse({ values })
        }

        if (request.action === "updateValues") {
          this.updatePageValues(request.values)
          window.chrome.storage.local.set({ liveboardValues: request.values })
          ConfigManager.liveboardValues = request.values
          this.stopMonitoring()
          this.startMonitoring()
          sendResponse({ success: true })
        }

        return true
      })

      // Capturar valores ao carregar a página
      this.applySavedValues()
    },

    captureAllValues() {
      const values = {
        visitantes: this.extractValue("Visitantes"),
        cliquesporproduto: this.extractValue("Cliques Por Produto"),
        pedidos: this.extractValue("Pedidos"),
        unidades: this.extractValue("Unidades"),
        totaldecompradores: this.extractValue("Total de Compradores"),
        taxadeconversao: this.extractValue("Taxa de Conversão de Pedidos"),
        vendastotais: this.extractSalesValue(),
      }

      // Salvar valores capturados
      window.chrome.storage.local.set({ liveboardValues: values })
      ConfigManager.liveboardValues = values

      return values
    },

    extractValue(label) {
      const labels = document.querySelectorAll("label")

      for (const labelElement of labels) {
        if (labelElement.textContent.includes(label)) {
          const parent = labelElement.closest("div")
          if (parent) {
            const valueSpan = parent.querySelector(".currency-value")
            if (valueSpan) {
              return valueSpan.textContent.trim()
            }
            const spans = parent.querySelectorAll("span")
            for (const span of spans) {
              const text = span.textContent.trim()
              if (/^\d+([.,]\d+)?$/.test(text)) {
                return text
              }
            }
          }
        }
      }

      return ""
    },

    extractSalesValue() {
      const salesElement = document.getElementById("count") || document.querySelector(".current-sales")

      if (salesElement) {
        const text = salesElement.textContent
        const match = text.match(/R\$\s*(\d+[.,]\d+)/)
        if (match) {
          return match[1]
        }
      }

      return ""
    },

    updatePageValues(values) {
      this.updateValueByLabel("Visitantes", values.visitantes)
      this.updateValueByLabel("Cliques Por Produto", values.cliquesporproduto)
      this.updateValueByLabel("Pedidos", values.pedidos)
      this.updateValueByLabel("Unidades", values.unidades)
      this.updateValueByLabel("Total de Compradores", values.totaldecompradores)
      this.updateValueByLabel("Taxa de Conversão de Pedidos", values.taxadeconversao)
      this.updateSalesValue(values.vendastotais)
    },

    updateValueByLabel(label, value) {
      const labels = document.querySelectorAll("label")

      for (const labelElement of labels) {
        if (labelElement.textContent.includes(label)) {
          const parent = labelElement.closest("div")
          if (parent) {
            const valueSpan = parent.querySelector(".currency-value")
            if (valueSpan) {
              valueSpan.textContent = value
              return
            }
            const spans = parent.querySelectorAll("span")
            for (const span of spans) {
              const text = span.textContent.trim()
              if (/^\d+([.,]\d+)?$/.test(text)) {
                span.textContent = value
                return
              }
            }
          }
        }
      }
    },

    updateSalesValue(value) {
      const salesElement = document.getElementById("count") || document.querySelector(".current-sales")

      if (salesElement) {
        const formatted = value.includes("R$") ? value : `R$ ${value}`

        const spans = salesElement.querySelectorAll("span")
        if (spans.length > 0) {
          const html = formatted.replace(
            /R\$\s*(\d+)([.,])(\d+)/,
            '<span style="margin-right: 20px;font-size: 65px;vertical-align: middle;">R$</span>$1<span style="font-size: 65px;">$2</span>$3',
          )
          salesElement.innerHTML = html
        } else {
          salesElement.textContent = formatted
        }
      }
    },

    applySavedValues() {
      const applyValues = async () => {
        await ConfigManager.load()

        if (ConfigManager.liveboardValues && Object.values(ConfigManager.liveboardValues).some((v) => v)) {
          this.updatePageValues(ConfigManager.liveboardValues)
          console.log("[LiveboardCapture] Valores salvos aplicados na página")

          this.startMonitoring()
        }
      }

      if (document.readyState === "loading") {
        window.addEventListener("load", () => {
          setTimeout(applyValues, 1500)
        })
      } else {
        setTimeout(applyValues, 1500)
      }
    },

    startMonitoring() {
      if (this.monitoring || this.valueObserver) {
        return
      }

      this.monitoring = true
      console.log("[LiveboardCapture] Iniciando monitoramento de valores")

      const checkAndCorrectValues = async () => {
        await ConfigManager.load()

        if (!ConfigManager.liveboardValues || !Object.values(ConfigManager.liveboardValues).some((v) => v)) {
          return
        }

        const savedValues = ConfigManager.liveboardValues
        let needsCorrection = false

        const valueMappings = [
          { key: "visitantes", label: "Visitantes" },
          { key: "cliquesporproduto", label: "Cliques Por Produto" },
          { key: "pedidos", label: "Pedidos" },
          { key: "unidades", label: "Unidades" },
          { key: "totaldecompradores", label: "Total de Compradores" },
          { key: "taxadeconversao", label: "Taxa de Conversão de Pedidos" },
        ]

        const normalizeValue = (val) => {
          if (!val) return ""
          return val.toString()
            .replace(/\s+/g, "")
            .replace(/R\$/gi, "")
            .replace(/[.,]/g, "")
        }

        for (const mapping of valueMappings) {
          if (savedValues[mapping.key]) {
            const currentValue = this.extractValue(mapping.label)
            const savedValue = savedValues[mapping.key].trim()

            if (currentValue && savedValue) {
              const currentNormalized = normalizeValue(currentValue)
              const savedNormalized = normalizeValue(savedValue)

              if (currentNormalized !== savedNormalized) {
                console.log(`[LiveboardCapture] Valor alterado detectado: ${mapping.label} - Atual: ${currentValue}, Esperado: ${savedValue}`)
                needsCorrection = true
                break
              }
            }
          }
        }

        if (savedValues.vendastotais) {
          const currentSales = this.extractSalesValue()
          const savedSales = savedValues.vendastotais.trim()

          if (currentSales && savedSales) {
            const currentNormalized = normalizeValue(currentSales)
            const savedNormalized = normalizeValue(savedSales)

            if (currentNormalized !== savedNormalized) {
              console.log(`[LiveboardCapture] Valor de vendas alterado detectado - Atual: ${currentSales}, Esperado: ${savedSales}`)
              needsCorrection = true
            }
          }
        }

        if (needsCorrection) {
          console.log("[LiveboardCapture] Corrigindo valores para os salvos")
          this.updatePageValues(savedValues)
        }
      }

      this.valueObserver = new MutationObserver(() => {
        if (this.checkTimeout) {
          clearTimeout(this.checkTimeout)
        }

        this.checkTimeout = setTimeout(() => {
          checkAndCorrectValues()
        }, 100)
      })

      this.valueObserver.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      })

      this.intervalId = setInterval(() => {
        checkAndCorrectValues()
      }, 500)
    },

    stopMonitoring() {
      if (this.valueObserver) {
        this.valueObserver.disconnect()
        this.valueObserver = null
      }

      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }

      if (this.checkTimeout) {
        clearTimeout(this.checkTimeout)
        this.checkTimeout = null
      }

      this.monitoring = false
      console.log("[LiveboardCapture] Monitoramento parado")
    },
  }

  // ============================================
  // MÓDULO DE SUBSTITUIÇÃO DE GRÁFICO
  // ============================================
  const ChartReplacer = {
    enabled: false,
    replaced: false,
    observer: null,

    init() {
      window.chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "toggleChart") {
          this.enabled = request.enabled
          window.chrome.storage.local.set({ replaceChart: request.enabled })

          if (request.enabled) {
            this.start()
          } else {
            this.stop()
          }

          sendResponse({ success: true })
        }
        return true
      })
    },

    start() {
      if (this.enabled && !this.replaced) {
        this.replace()
        this.observe()
      }
    },

    stop() {
      if (this.observer) {
        this.observer.disconnect()
        this.observer = null
      }
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
      this.replaced = false
    },

    replace() {
      if (!this.enabled || this.replaced) return

      const charts = document.querySelectorAll(".line-chart__normal")
      if (charts.length > 0) {
        const lastChart = charts[charts.length - 1]

        if (lastChart.querySelector("iframe")) {
          this.replaced = true
          return
        }

        const iframe = document.createElement("iframe")
        iframe.src = "https://courageous-cascaron-3e466a.netlify.app"
        iframe.style.width = "100%"
        iframe.style.height = "100%"
        iframe.style.border = "0"

        lastChart.innerHTML = ""
        lastChart.appendChild(iframe)

        document.body.style.overflow = "hidden"
        document.documentElement.style.overflow = "hidden"

        this.replaced = true
        console.log("[ChartReplacer] Gráfico substituído")

        setTimeout(() => LiveboardCapture.applySavedValues(), 500)
      }
    },

    observe() {
      if (!this.enabled || this.replaced) return

      if (this.observer) {
        this.observer.disconnect()
      }

      this.observer = new MutationObserver(() => {
        if (this.enabled && !this.replaced) {
          this.replace()
        }
      })

      this.observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
    },

    async tryReplace() {
      await ConfigManager.load()
      this.enabled = ConfigManager.replaceChartEnabled

      if (this.enabled) {
        this.replace()
        this.observe()
      }
    },
  }

  // ============================================
  // MÓDULO DE SUBSTITUIÇÃO DE RANKING
  // ============================================
  const RankingReplacer = {
    enabled: false,
    replaced: false,
    observer: null,

    init() {
      window.chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "toggleRanking") {
          this.enabled = request.enabled
          window.chrome.storage.local.set({ replaceRanking: request.enabled })

          if (request.enabled) {
            this.start()
          } else {
            this.stop()
          }

          sendResponse({ success: true })
        }

        if (request.action === "updateProducts") {
          ConfigManager.products = request.products || []
          window.chrome.storage.local.set({ products: ConfigManager.products })

          if (this.enabled) {
            this.replaced = false
            setTimeout(() => this.replace(), 100)
          }

          sendResponse({ success: true })
        }

        return true
      })
    },

    start() {
      if (this.enabled && !this.replaced) {
        this.replace()
        this.observe()
      }
    },

    stop() {
      if (this.observer) {
        this.observer.disconnect()
        this.observer = null
      }
      this.replaced = false
    },

    generateProductsHTML() {
      const defaultProducts = [
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgjeF8MpRDau89BqT_rUbx4YTPmJKuVUKsQ&s",
          name: "Canela  500g em Pó Natural 100% Pura 500g",
          price: "38,00",
        },
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgjeF8MpRDau89BqT_rUbx4YTPmJKuVUKsQ&s",
          name: "Canela  500g em Pó Natural 100% Pura 500g",
          price: "38,00",
        },
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgjeF8MpRDau89BqT_rUbx4YTPmJKuVUKsQ&s",
          name: "Canela  500g em Pó Natural 100% Pura 500g",
          price: "38,00",
        },
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgjeF8MpRDau89BqT_rUbx4YTPmJKuVUKsQ&s",
          name: "Canela  500g em Pó Natural 100% Pura 500g",
          price: "38,00",
        },
        {
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgjeF8MpRDau89BqT_rUbx4YTPmJKuVUKsQ&s",
          name: "Canela  500g em Pó Natural 100% Pura 500g",
          price: "38,00",
        },
      ]

      const productsToUse = ConfigManager.products.length === 5 ? ConfigManager.products : defaultProducts

      let itemsHTML = ""
      productsToUse.forEach((product, index) => {
        const seq = index + 1
        itemsHTML += `
          <div data-v-04394e82="" class="item item__normal">
            <span data-v-04394e82="" class="seq__normal seq__normal--top2">${seq}</span>
            <div data-v-04394e82="" class="product-image">
              <img data-v-04394e82="" src="${product.image}" alt="${product.name}">
              <div data-v-04394e82="" class="img-layer img-layer__normal"></div>
            </div>
            <span data-v-04394e82="" class="name name__normal">${product.name}</span>
            <label data-v-04394e82="" class="sale sale__normal">
              <span class="currency">
                <span class="currency-symbol">R$</span>
                <span class="currency-value">${product.price}</span>
              </span>
            </label>
          </div>
        `
      })

      return `
        <div data-v-04394e82="" class="product-ranking-body product-ranking-body__normal">
          ${itemsHTML}
        </div>
      `
    },

    replace() {
      if (!this.enabled || this.replaced) return

      const el = document.querySelector(".product-ranking-body.product-ranking-body__normal")
      if (el) {
        const firstItem = el.querySelector(".item.item__normal")
        if (firstItem) {
          const productName = firstItem.querySelector(".name.name__normal")?.textContent
          if (productName && productName.includes("Canela")) {
            this.replaced = true
            return
          }
        }

        try {
          const wrapper = document.createElement("div")
          wrapper.innerHTML = this.generateProductsHTML()
          const generatedWrapper = wrapper.querySelector(".product-ranking-body.product-ranking-body__normal")
          if (generatedWrapper) {
            el.innerHTML = generatedWrapper.innerHTML
          } else {
            el.innerHTML = wrapper.innerHTML
          }
          this.replaced = true
          console.log("[RankingReplacer] Ranking de produtos substituído")

          setTimeout(() => LiveboardCapture.applySavedValues(), 500)
        } catch (e) {
          console.error("[RankingReplacer] Erro ao aplicar innerHTML:", e)
        }
      }
    },

    observe() {
      if (!this.enabled || this.replaced) return

      if (this.observer) {
        this.observer.disconnect()
      }

      this.observer = new MutationObserver(() => {
        if (this.enabled && !this.replaced) {
          this.replace()
        }
      })

      this.observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
    },

    async tryReplace() {
      await ConfigManager.load()
      this.enabled = ConfigManager.replaceRankingEnabled

      if (this.enabled) {
        this.replace()
        this.observe()
      }
    },
  }

  // ============================================
  // INICIALIZAÇÃO
  // ============================================
  async function init() {
    await ConfigManager.load()

    ChartReplacer.enabled = ConfigManager.replaceChartEnabled
    RankingReplacer.enabled = ConfigManager.replaceRankingEnabled

    ChartReplacer.init()
    RankingReplacer.init()
    LiveboardCapture.init()
    PopupManager.init()

    const tryReplace = () => {
      ChartReplacer.tryReplace()
      RankingReplacer.tryReplace()
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(tryReplace, 500)
      })
    } else {
      setTimeout(tryReplace, 500)
    }

    setTimeout(tryReplace, 1000)
    setTimeout(tryReplace, 2000)
  }

  init()
})()

