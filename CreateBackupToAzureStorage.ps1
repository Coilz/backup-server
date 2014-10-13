function Create-Backup {
    param(
        [string] $accountName = "coilzminecraft",
        [string] $accountKey,
        [string] $containerName,
        [string] $blobName,
        [string] $filePath
    )

    $context = New-AzureStorageContext -StorageAccountName $accountName -StorageAccountKey $accountKey

    function Assert-Container {
        $container = Get-AzureStorageContainer -Context $context | Where-Object { $_.Name -eq $containerName }

        if ( $container.Count -eq 0) {
            New-AzureStorageContainer -Name $containerName -Context $context
        }
    }

    $storageAccount = Get-AzureStorageAccount $accountName

    Assert-Container
    Set-AzureStorageBlobContent -Blob $blobName -Container $containerName -File $filePath -Context $context
}

Create-Backup -accountKey "Ewdy9iuztH48l5KBDyY6EygWd4hXMRtqomQO6bwgl36H5AKZ1/FmGj3CYmYU5STxSQrohzVwa1U1nrrhHKIHaA==" -containerName "coilz-mc-ubuntu" -blobName "20140908.zip" -filePath "E:\Backup\20140908.zip"