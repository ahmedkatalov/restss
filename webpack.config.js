// Импорт необходимых модулей
const path = require('path'); // Node.js модуль для работы с путями файловой системы
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Плагин для работы с HTML
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Плагин для извлечения CSS в отдельные файлы
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Плагин для копирования статических файлов

// Основной объект конфигурации Webpack
module.exports = {
  // Точки входа (entry points) - файлы, с которых начинается сборка
  entry: {
    index: "./src/scripts/index.js", // Скрипт для menu.html
    menu: "./src/scripts/menu.js",
    aboutUs: "./src/scripts/aboutUs.js",
    contact: "./src/scripts/contact.js"
  },

  // Настройки выходных файлов
  output: {
    filename: 'scripts/[name].bundle.js', // Шаблон именования выходных JS файлов
                                        // [name] будет заменено на ключи из entry (index, menu)
    path: path.resolve(__dirname, 'dist'), // Путь для выходных файлов (папка dist)
    clean: true, // Очищать папку output перед каждой сборкой
    // publicPath: '/r/',
    // assetModuleFilename: 'assets/[hash][ext][query]'
  },

  // Модули и правила их обработки
  module: {
    rules: [
      // Правило для обработки CSS файлов
      {
        test: /.css$/, // Применять правило к файлам с расширением .css
        use: [
          MiniCssExtractPlugin.loader, // Извлекает CSS в отдельные файлы
          'css-loader', // Позволяет импортировать CSS в JavaScript
        ],
      },
      // Правило для обработки изображений
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // Регулярное выражение для изображений
        type: 'asset/resource', // Обрабатывать как статический ресурс
        generator: {
          filename: 'assets/images/[name][ext]', // Сохранять в assets/images с оригинальным именем
        },
      },
    ],
  },

  // Плагины Webpack
  plugins: [
    // Плагин для извлечения CSS в отдельные файлы
    new MiniCssExtractPlugin({ 
      filename: 'styles/[name].css', // Шаблон именования CSS файлов
    }),
    
    // Плагин для генерации index.html
    new HtmlWebpackPlugin({
      filename: 'index.html', // Имя выходного файла
      template: './src/pages/index.html', // Шаблон для генерации
      chunks: ['index'], // Какие chunks (из entry) подключать
    }),
    new HtmlWebpackPlugin({
      filename: 'menu.html', // Имя выходного файла
      template: './src/pages/menu.html', // Шаблон для генерации
      chunks: ['menu'], // Какие chunks (из entry) подключать
    }),
    
    // Плагин для генерации menu.html
    new HtmlWebpackPlugin({
      filename: 'aboutUs.html', // Имя выходного файла
      template: './src/pages/aboutUs.html', // Шаблон для генерации
      chunks: ['aboutUs'], // Какие chunks (из entry) подключать
    }),
    
    new HtmlWebpackPlugin({
      filename: 'contact.html', // Имя выходного файла
      template: './src/pages/contact.html', // Шаблон для генерации
      chunks: ['contact'], // Какие chunks (из entry) подключать
    }),
    // Плагин для копирования статических файлов
  ],
  // Настройки dev-сервера для разработки
  devServer: {
    static: './dist', // Откуда раздавать статические файлы
    hot: true, // Включить Hot Module Replacement (горячая перезагрузка)
  },

  // Режим сборки
  mode: 'development', // Режим разработки (влияет на оптимизации)
};